import { Interaction, Client } from "discord.js"
import commandInteraction from "../utilities/commandInteraction/commandInteraction";
import send_any from "../components/common/send_any";
import selectMenuInteraction from "../utilities/selectMenuInteraction/selectMenuInteraction";

export default {
    name : "interactionCreate",
    once : false,
    async execute (interaction : Interaction, client : Client , BOT_TOKEN : string, CLIENT_ID : string , GUILD_ID : string) {

        if(!interaction.isChatInputCommand() && !interaction.isStringSelectMenu()) return;

        if(interaction.isChatInputCommand()){
            try {
                await commandInteraction(client , interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply(send_any(0xF75B60, "⚠️ An error occurred while executing the command." , error as string));
            }
        }

        if(interaction.isStringSelectMenu()){
            try{
                await selectMenuInteraction(client, interaction);
            }catch (error) {
                console.error(error);
                await interaction.reply(send_any(0xF75B60, "⚠️ An error occurred while executing the command." , error as string));
            }
        }
    }
}