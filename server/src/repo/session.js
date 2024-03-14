import { getDb } from "../db/conn";

export async function newSession(sessionId, username, roomId) {
  const db = getDb();
  const collection = db.collection("sessions");
  const result = await collection.insertOne({
    session_id: sessionId,
    username: username,
    room_id: roomId,
  });  
  return result;
}

export async function deleteSessionByUsernameRoom(username, roomId) {
  const db = getDb();
  const collection = db.collection("sessions");
  const result = await collection.deleteOne({
    username: username,
    room_id: roomId,
  });
  return result;
}

export async function addNewRoom(roomId) {
  const db = getDb();
  const collection = db.collection("rooms");
  const findRoom = await collection.findOne({ room_id: roomId });
  if (!findRoom) {
    collection.insertOne({
      room_id: roomId,
    });
  }
}

export async function getSession(sessionId) {
  const db = getDb();
  const collection = db.collection("sessions");
  return await collection.findOne({ session_id: sessionId });
}

export async function getUserInRoom(username, roomId) {
  const db = getDb();
  const collection = db.collection("sessions");
  return await collection.findOne({
    username: username,
    room_id: roomId,
  });
}

export async function getPrevMessage(roomId) {
  const db = getDb();
  const collection = db.collection("rooms");
  return await collection.findOne({
    room_id: roomId,
  });
}

export async function addNewMessage(roomId, updates) {
  const db = getDb();
  const collection = db.collection("rooms");
  return await collection.updateOne({ room_id: roomId }, updates);
}