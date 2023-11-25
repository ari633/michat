import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import {
  addNewRoom,
  deleteSessionByUsernameRoom,
  getSession,
  newSession,
  addNewMessage,
  getPrevMessage,
  getUserInRoom
} from "./repo/session";

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

  /**
   * Add new room if not exist
   */
  await addNewRoom(roomId);

  if (sessionId) {
    const session = await getSession(sessionId);
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

  const isUserExistInRoom = await getUserInRoom(username, roomId);

  if (isUserExistInRoom) {
    return next(new Error("Username already exist in room"));
  }

  const newSessionId = uuidv4();
  const newUsername = username;
  const newRoomId = roomId;

  await newSession(newSessionId, newUsername, newRoomId);

  socket.sessionId = newSessionId;
  socket.username = newUsername;
  socket.roomId = newRoomId;

  next();
});

app.get("/", async (req, res) => {
  res.json({ message: "Ok" });
});

io.on("connection", async (socket) => {
  const roomId = socket.roomId;
  const username = socket.username;
  const sessionId = socket.sessionId;

  const prevMessages = await getPrevMessage(roomId);

  socket.emit("session", {
    sessionId: sessionId,
    roomId: roomId,
    username: username,
    prevMessages: prevMessages.messages,
  });

  socket.join(socket.roomId);

  console.log("user connect", {
    roomId: roomId,
    username: username,
    sessionId: sessionId,
  });

  socket.on("message_room", async ({ value, roomId }) => {
    const newMessage = {
      text: value,
      from: username,
    };

    console.log("new message", newMessage);

    const updates = {
      $push: { messages: newMessage },
    };

    await addNewMessage(roomId, updates);

    io.to(roomId).emit("message_room", { text: value, from: username });
  });

  socket.on("exit_session", async () => {
    const result = await deleteSessionByUsernameRoom(
      username,
      roomId
    );

    console.log("exit_session", result);
  });

  socket.on("disconnect", async () => {
    console.log("user disconnected", username, roomId);
  });
});

httpServer.listen(PORT, () => {
  console.log("listening on *" + PORT);
});
