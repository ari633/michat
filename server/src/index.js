import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";

import { registerUser } from "./handler/regiserUser";
import { messages } from "./handler/messages";
import { ioMiddleware } from "./middleware/ioMiddleware";

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

ioMiddleware(io);

io.on("connection", async (socket) => {
  registerUser(io, socket);
  messages(io, socket);
});

app.get("/ping", async (req, res) => {
  res.json({ message: "Ok" });
});

httpServer.listen(PORT, () => {
  console.log("listening on *" + PORT);
});
