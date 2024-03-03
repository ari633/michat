import {
  addNewRoom,
  getSession,
  newSession,
  getUserInRoom
} from "../repo/session";
import { v4 as uuidv4 } from "uuid";


export const ioMiddleware = (io) => {
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
}