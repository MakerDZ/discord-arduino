import { Client } from 'discord.js';
import * as fs from 'fs';
import { join } from 'path';


const eventsFolder = join(__dirname, '..' , 'events');
export default function loadEvents(client : Client, BOT_TOKEN : string | undefined, CLIENT_ID : string | undefined, GUILD_ID : string | undefined){
    const eventFiles = fs.readdirSync(eventsFolder).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    for (const file of eventFiles) {
        const { default: event } = require(join(eventsFolder, file));
        if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, BOT_TOKEN, CLIENT_ID, GUILD_ID));
        } else {
        client.on(event.name, (...args) => event.execute(...args, client, BOT_TOKEN, CLIENT_ID, GUILD_ID));
        }
    }
}