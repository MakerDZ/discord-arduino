import { EmbedBuilder } from "discord.js";

export default function reply_with_pong(){
    const reply = new EmbedBuilder()
                .setColor(0x0272b3)
                .setTitle('🏓  replied with Pong!!\n\n\n')
    return {embeds: [reply] , ephemeral: true};
}