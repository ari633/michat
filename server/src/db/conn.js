import { MongoClient } from "mongodb";
const connectionString = process.env.MONGO_URI || "";
const dbName = process.env.MONGO_DB_NAME || "";

const client = (new MongoClient(connectionString));

export async function db() {
  let conn = await client.connect();
  let dbs = conn.db(dbName);

  return dbs;
}
