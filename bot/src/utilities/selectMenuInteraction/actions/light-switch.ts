import { Interaction, AnySelectMenuInteraction } from "discord.js"
import axios, { AxiosRequestConfig } from "axios";;
import db from "../../../libraries/common/dbConnection";
import send_any from "../../../components/common/send_any";
import control_light_status from "../../../components/controlLight/controlLightStatus";

export default async function is_light_switch(Interaction : Interaction){
    const interaction = Interaction as AnySelectMenuInteraction;
    const switch_control_data = interaction.values[0].split(" ");
    const updated_status = Boolean(+switch_control_data[0]);
    const index_of_light = switch_control_data[1]
    if(interaction.customId !== 'control_light') return;
    let url = await db.getData('api_url') as string;
    let token = await db.getData('api_token') as string;
    url = url == null ? "https://example.com" : url.endsWith('/') ? url.substring(0, url.length - 1) : url;url.endsWith('/') ? url.substring(0, url.length - 1) : url;
    const headers = {
        'Content-Type': 'application/json',
        TOKEN : token
    }
    const config_update_light : AxiosRequestConfig = {
        url : `${url}/api/v1/updatelight/${index_of_light}`,
        method : 'PUT',
        headers : headers,
        data : {
            "status" : updated_status
        }
    }
    axios(config_update_light)
        .then(async response => {
            const name = response.data.name;
            const current_status = response.data.status;
            await interaction.update(control_light_status(index_of_light , name , current_status));
        })
        .catch((error)=> {
            console.error(error);
            interaction.reply(send_any(0xF70031, "⚠️ Failed" , "Please select different status."));
        })
}