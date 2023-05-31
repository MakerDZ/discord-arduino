import { SlashCommandBuilder } from "discord.js";

const api_connection = new SlashCommandBuilder()
    .setName('api')
    .setDescription('⚙️ API setup')
    .addSubcommandGroup((group)=> group
        .setName('setup')
        .setDescription('Set API URL🔗 and API TOKEN🔒')
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
    )
    .addSubcommandGroup((group)=> group
            .setName('test')
            .setDescription('💡 Test Your API setup is success or not')
            .addSubcommand(sub => sub
                .setName('connection')
                .setDescription('💡 Test Your API.')
            )
    )

export default api_connection;