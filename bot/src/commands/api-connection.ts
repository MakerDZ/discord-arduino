import { SlashCommandBuilder } from "discord.js";

const api_connection = new SlashCommandBuilder()
    .setName('api')
    .setDescription('⚙️ API setup')
    .addSubcommand(sub => sub
        .setName('connection')
        .setDescription('📡 make connection to API')
        .addStringOption(option => option
            .setName('api_url')
            .setDescription('🔗 URL of API')
            .setRequired(true)
        )
        .addStringOption(option => option
                .setName('api_token')
                .setDescription('🔒 TOKEN of API')
                .setRequired(true)
        )
    )

export default api_connection;