import { EmbedBuilder } from "discord.js";

export default function no_permission(){
    const reply = new EmbedBuilder()
                .setColor(0xF75B60)
                .setTitle(`🚫  You don't have permission to use this action.\n\n\n`)
    return {embeds: [reply] , ephemeral: true};
}