import { MongoClient } from "mongodb";
const connectionString = process.env.MONGO_URI || "";
const dbName = process.env.MONGO_DB_NAME || "";

const client = (new MongoClient(connectionString));

let db; 

export async function connectToDatabase() {
  try {
    if (!db) {
      let conn = await client.connect();
      console.log('Connected to MongoDB');
      db = conn.db(dbName);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export function getDb() {
  return db;
}
