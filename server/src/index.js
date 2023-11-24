import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db/conn";

const PORT = process.env.PORT || 9090;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(
  bodyParser.json({
    limit: "1mb",
  })
);

io.use(async (socket, next) => {
  const username = socket.handshake.auth.username;
  const roomId = socket.handshake.auth.roomId;
  const sessionId = socket.handshake.auth.sessionId;


  const collectionRoom = (await db()).collection("rooms");
  const findRoom = await collectionRoom.findOne({ room_id: roomId });
  if (!findRoom) {
    collectionRoom.insertOne({
      room_id: roomId
    })
  }

  const collection = (await db()).collection("sessions");
  if (sessionId) {
    const session = await collection.findOne({ session_id: sessionId });
    if (session) {
      socket.sessionId = sessionId;
      socket.username = session.username;
      socket.roomId = session.room_id;
      return next();
    }
  }

  if (!username) {
    return next(new Error("invalid username"));
  }

  const isUserExistInRoom = await collection.findOne({
    username: username,
    room_id: roomId,
  });

  if (isUserExistInRoom) {
    return next(new Error("Username already exist in room"));
  }

  const newSessionId = uuidv4();
  const newUsername = username;
  const newRoomId = roomId;

  collection.insertOne({
    session_id: newSessionId,
    username: newUsername,
    room_id: newRoomId,
  });

  socket.sessionId = newSessionId;
  socket.username = newUsername;
  socket.roomId = newRoomId;

  next();
});

app.get("/", async (req, res) => {
  res.json({ message: "Ok", data: results });
});

io.on("connection", async (socket) => {

  let roomsCollection = (await db()).collection("rooms");
  const prevMessages = await roomsCollection.findOne({room_id: socket.roomId});
  socket.emit("session", {
    sessionId: socket.sessionId,
    roomId: socket.roomId,
    username: socket.username,
    prevMessages: prevMessages.messages
  });

  socket.join(socket.roomId);

  console.log("user connect", {
    roomId: socket.roomId,
    username: socket.username,
    sessionId: socket.sessionId,
  });

  socket.on("message_room", async ({ value, roomId }) => {
    const newMessage = {
      text: value,
      from: socket.username,
    };

    console.log("new message", newMessage);

    const updates = {
      $push: { messages: newMessage }
    };

    await roomsCollection.updateOne({room_id: roomId}, updates);

    io.to(roomId).emit("message_room", { text: value, from: socket.username });
  });

  socket.on("exit_session", async () => {
    const collection = (await db()).collection("sessions");
    const result = await collection.deleteOne({
      username: socket.username,
      room_id: socket.roomId,
    });
    console.log("exit_session", result);
  });

  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.username, socket.roomId);
  });
});

httpServer.listen(PORT, () => {
  console.log("listening on *" + PORT);
});
