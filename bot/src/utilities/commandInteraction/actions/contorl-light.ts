import { Interaction , ChatInputCommandInteraction, GuildMember } from "discord.js";
import axios, { AxiosRequestConfig } from "axios";
import no_permission from "../../../components/common/no_permission";
import db from "../../../libraries/common/dbConnection";
import send_any from "../../../components/common/send_any";
import choose_light from "../../../components/controlLight/chooseLight";

export default async function is_control_ligth(Interaction : Interaction){
    const interaction = Interaction as ChatInputCommandInteraction;
    const member = interaction.member as GuildMember;
    const isAdmin = member.permissions.has("Administrator");
    const permissioned_users = await db.getData('users') as Array<string>;
    const interacted_user = interaction.user.id as string;
    const have_permission = permissioned_users.includes(interacted_user);
    if(interaction.commandName !== "light") return;
    if(!isAdmin && !have_permission){
        interaction.reply(no_permission());
    }else{
        console.log(interaction.user.id);
        let url = await db.getData('api_url') as string;
        let token = await db.getData('api_token') as string;
        url = url == null ? "https://example.com" : url.endsWith('/') ? url.substring(0, url.length - 1) : url;url.endsWith('/') ? url.substring(0, url.length - 1) : url;
        const headers = {
            'Content-Type': 'application/json',
            TOKEN : token
        }
        switch(interaction.options.getSubcommandGroup()){
            case 'create':
                const new_light = interaction.options.get('light_name')?.value as string;
                const body_create = {
                    "name" : new_light
                }
                const config_create: AxiosRequestConfig = {
                    url: `${url}/api/v1/createlight`,
                    method: 'POST',
                    headers: headers,
                    data : body_create
                };
                await axios(config_create)
                    .then(async (response) => {
                        if(response.data.status){
                            const name = await response.data.data.name;
                            const count = await response.data.data.index;
                            await interaction.reply(send_any(0x01C851, "✅ Success" , `New Light was successfully created.\n\n Light Name - ${name} \n\n Index Of Light - ${count}`));
                            return;
                        }
                        const description = await response.data.message
                        await interaction.reply(send_any(0xF70031, "⚠️ Failed" , description))
                        return;
                    })
                    .catch((error)=> {
                        console.log(error);
                        interaction.reply(send_any(0xF70031, "⚠️ Failed" , "API connection failed. URL or TOKEN might not be valid."));
                    })
                break;
            case "delete":
                const config_delete : AxiosRequestConfig = {
                    url: `${url}/api/v1/deletelight`,
                    method : 'DELETE',
                    headers : headers
                }
                await axios(config_delete)
                    .then(async (response) => {
                        if(response.status){
                            const description = await response.data.message
                            await interaction.reply(send_any(0x01C851, "✅ Success" , description));
                            return;
                        }
                        await interaction.reply(send_any(0xF70031, "⚠️ Failed" , "Please try again."));
                        return;
                    })
                    .catch((error)=> {
                        console.error(error);
                        interaction.reply(send_any(0xF70031, "⚠️ Failed" , "API connection failed. URL or TOKEN might not be valid."));
                    })
                break;
            case 'list':
                const config_list : AxiosRequestConfig = {
                    url: `${url}/api/v1/lights`,
                    method : 'GET',
                    headers : headers
                }
                await axios(config_list)
                    .then(async (response) => {
                        const data = await response.data as Array<any>
                        if(data.length == 1){
                            await interaction.reply(send_any(0xF70031, "💡 No Light" , "You haven't created any lights"));
                            return;
                        }
                        let description = "";
                        data.forEach(data => {
                            description += `${data.index} - ${data.name} \n\n`
                        })
                        await interaction.reply(send_any(0x01C851, "💡 Light List" , description));
                        return;
                    })
                    .catch((error)=> {
                        console.error(error);
                        interaction.reply(send_any(0xF70031, "⚠️ Failed" , "API connection failed. URL or TOKEN might not be valid."));
                    })
                break;
            case 'control':
                const config_interface : AxiosRequestConfig = {
                    url: `${url}/api/v1/lights`,
                    method : 'GET',
                    headers : headers
                }
                await axios(config_interface)
                    .then(async (response) => {
                        const data = await response.data as Array<any>
                        if(data.length == 1){
                            await interaction.reply(send_any(0xF70031, "💡 No Light" , "You haven't created any lights"));
                            return;
                        }
                        const lights = data.map(light => {
                            return {
                                label : light.name,
                                value : light.index.toString()
                            }
                        })
                        await interaction.reply(choose_light(lights));
                        return;
                    })
                    .catch((error)=> {
                        console.error(error);
                        interaction.reply(send_any(0xF70031, "⚠️ Failed" , "API connection failed. URL or TOKEN might not be valid."));
                    })
                break;
        } 
    }
}