import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import db  from "../utility/dbConnection.ts" 

interface LightSchema {
    _id? : ObjectId,
    name : String,
    status : boolean
}

export const Lights = db.collection<LightSchema>('lights');