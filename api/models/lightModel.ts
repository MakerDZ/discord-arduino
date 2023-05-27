import db  from "../utility/dbConnection.ts" 

interface LightSchema {
    index : number,
    name : String,
    status : boolean
}

export const Lights = db.collection<LightSchema>('lights');