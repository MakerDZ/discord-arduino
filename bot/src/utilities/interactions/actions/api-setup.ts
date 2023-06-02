import { ChatInputCommandInteraction , Interaction, GuildMember } from "discord.js";
import axios, { AxiosRequestConfig } from "axios";
import db from "../../../libraries/common/dbConnection";
import action_success from "../../../components/common/action_success";
import no_permission from "../../../components/common/no_permission";
import send_any from "../../../components/common/send_any";

export default async function is_api_setup(Interaction : Interaction){
    const interaction = Interaction as ChatInputCommandInteraction;
    const member = interaction.member as GuildMember;
    const isAdmin = member.permissions.has("Administrator");
    if(interaction.commandName !== "api") return;
    if(!isAdmin){
        interaction.reply(no_permission());
    }else{
        let url = await db.getData('api_url') as string;
        let token = await db.getData('api_token') as string;
        url = url == null ? "https://example.com" : url.endsWith('/') ? url.substring(0, url.length - 1) : url;url.endsWith('/') ? url.substring(0, url.length - 1) : url;
        switch(interaction.options.getSubcommandGroup()){
            case 'setup':
                const api_url = interaction.options.get('api_url')?.value as string;
                const api_token = interaction.options.get('api_token')?.value as string;
                await db.addData("api_url", api_url);
                await db.addData("api_token", api_token);
                await interaction.reply(action_success());
                break;
            case 'test':
                const headers = {
                    'Content-Type': 'application/json',
                    TOKEN : token
                }
                const config: AxiosRequestConfig = {
                    url: `${url}/api/v1`,
                    method: 'GET',
                    headers: headers,
                };
                axios(config)
                .then(async (response) => {
                    const description = await response.data.message
                    if(response.data.status){
                        await interaction.reply(send_any(0x01C851, "✅ Success" , description));
                        return;
                    }
                    await interaction.reply(send_any(0xF70031, "⚠️ Failed" , description));    
                })
                .catch((error) => {
                    console.error(error);
                    interaction.reply(send_any(0xF70031, "⚠️ Failed" , "API connection failed. URL or TOKEN might not be valid."));
                });
                break;
        }
        
    }
}