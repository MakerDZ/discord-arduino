import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { env } from "../config.ts";

const client = new MongoClient();
client.connect(env.MONGO_HOST);
const db = client.database("lights");

export default db;