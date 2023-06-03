import { AnySelectMenuInteraction, Interaction } from "discord.js";
import control_light_status from "../../../components/controlLight/controlLightStatus";
import axios, { AxiosRequestConfig } from "axios";
import db from "../../../libraries/common/dbConnection";
import send_any from "../../../components/common/send_any";

export default async function is_select_light(Interaction : Interaction){
    const interaction = Interaction as AnySelectMenuInteraction;
    const index_of_light = interaction.values[0];
    if(interaction.customId !== 'choose_light') return;
    let url = await db.getData('api_url') as string;
    let token = await db.getData('api_token') as string;
    url = url == null ? "https://example.com" : url.endsWith('/') ? url.substring(0, url.length - 1) : url;url.endsWith('/') ? url.substring(0, url.length - 1) : url;
    const headers = {
        'Content-Type': 'application/json',
        TOKEN : token
    }
    const config_list : AxiosRequestConfig = {
        url: `${url}/api/v1/lights`,
        method : 'GET',
        headers : headers
    }
    console.log(index_of_light)
    await axios(config_list)
        .then(async (response) => {
            const data = await response.data as Array<any>
            const current_light = data.filter(light => {
                if(light.index == index_of_light){
                    return {
                        name : light.name,
                        status : light.status
                    }
                }
            })
            await interaction.reply(control_light_status(index_of_light , current_light[0].name , current_light[0].status));
        })
        .catch((error)=> {
            console.error(error);
            interaction.reply(send_any(0xF70031, "⚠️ Failed" , "Please select different light first or refresh the command."));
        })
}