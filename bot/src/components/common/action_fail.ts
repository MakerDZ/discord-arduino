import { EmbedBuilder } from "discord.js";

export default function action_fail(){
    const reply = new EmbedBuilder()
                .setColor(0xF70031)
                .setTitle(`❌  Action Failed!!\n\n\n`)
    return {embeds: [reply] , ephemeral: true};
}