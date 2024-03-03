import { addNewMessage } from "../repo/session";

export const messages = (io, socket) => {
  const username = socket.username;
  
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
}