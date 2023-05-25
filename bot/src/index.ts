import { Client, GatewayIntentBits, ActivityType } from "discord.js"; 
import 'dotenv/config';
import loadEvents from "./libraries/eventHandling";

//Initializing Intents
const client = new Client({
    intents : [ 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: "Beautiful People 👀",
            type: ActivityType.Watching,
        }],
    },
})

// Login Into Bot and Loading Events, Commands
client.login(process.env.BOT_TOKEN).then(()=>{
    loadEvents(client, process.env.BOT_TOKEN, process.env.CLIENT_ID, process.env.GUILD_ID);
}).catch(err => {
    console.log(`There is error : ${err}`);
})