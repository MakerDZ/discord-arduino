import { Client } from "discord.js"
import loadCommands from "../libraries/commandHandling";

export default {
    name : 'ready',
    once : true,
    execute(client : Client , data : Client, BOT_TOKEN : string, CLIENT_ID : string , GUILD_ID : string){
        console.log(`${client.user?.tag} is logged in.`);
        loadCommands(BOT_TOKEN, CLIENT_ID, GUILD_ID);
    }
}