import { EmbedBuilder } from "discord.js";

export default function send_any(color_code : number , title : string , description : string ){
    const reply = new EmbedBuilder()
                .setColor(color_code)
                .setTitle(title)
                .setDescription(description)
    return {embeds: [reply] , ephemeral: true};
}