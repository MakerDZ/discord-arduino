import { SlashCommandBuilder } from "discord.js";

const ping_pong = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 I will reply pong!!')

export default ping_pong;