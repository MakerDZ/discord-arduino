import { ErrorEvent } from "discord.js"

export default {
    name : "error",
    once : false,
    execute (error : ErrorEvent){
        console.error('Discord.js error:', error);
    }
}