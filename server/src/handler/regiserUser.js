import { getPrevMessage, deleteSessionByUsernameRoom } from "../repo/session";
export const registerUser = async (io, socket) => {
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

  socket.on("exit_session", async (callback) => {
    const result = await deleteSessionByUsernameRoom(
      username,
      roomId
    );
    callback({
      status: "ok"
    });
  });

  socket.on("disconnect", async () => {
    setTimeout(() => {
      deleteSessionByUsernameRoom(
        username,
        roomId
      );
      console.log("user disconnected more than 10 second", username, roomId);
    }, 10000);
    console.log("user disconnected", username, roomId);
  });
};