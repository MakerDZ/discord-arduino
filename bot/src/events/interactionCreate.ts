import { Interaction, Client } from "discord.js"
import commandInteraction from "../utilities/interactions/commandInteraction";
import send_any from "../components/common/send_any";

export default {
    name : "interactionCreate",
    once : false,
    async execute (interaction : Interaction, client : Client , BOT_TOKEN : string, CLIENT_ID : string , GUILD_ID : string) {

        if(!interaction.isChatInputCommand()) return;

        if(interaction.isChatInputCommand()){
            try {
                await commandInteraction(client , interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply(send_any(0xF75B60, "⚠️ An error occurred while executing the command." , error as string));
            }
        }
    }
}