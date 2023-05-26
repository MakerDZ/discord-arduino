import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import { env } from "../config.ts";

const client = new MongoClient();

try{
  await client.connect({
    db: env.MONGO_DB,
    tls: true,
    servers: [
      {
        host: env.MONGO_HOST,
        port: 27017,
      },
    ],
    credential: {
      username: env.MONGO_USERNAME,
      password: env.MONGO_PASSWORD,
      db: env.MONGO_DB,
      mechanism: "SCRAM-SHA-1",
    },
  });
  console.log("DB connection established.");
}catch(error){
  console.log(`DB connection error: ${error}`);
}


const db = client.database("lights");

export default db;