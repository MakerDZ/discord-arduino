import { EmbedBuilder } from "discord.js";

export default function action_success(){
    const reply = new EmbedBuilder()
                .setColor(0x01C851)
                .setTitle(`✅  Action Success!!\n\n\n`)
    return {embeds: [reply] , ephemeral: true};
}