import { SlashCommandBuilder } from "discord.js";

const control_light = new SlashCommandBuilder()
    .setName('light')
    .setDescription('💡 Use this command to control light functions')
    .addSubcommandGroup((group) => group
        .setName('create')
        .setDescription('✏️ Able to create new light.')
        .addSubcommand(sub => sub
            .setName('light')
            .setDescription('✏️ To create new light')
            .addStringOption(option => option
                .setName('light_name')
                .setDescription('The name of new light.')
                .setRequired(true)
            )    
        )
    )
    .addSubcommandGroup((group)=> group
        .setName('delete')
        .setDescription('🗑️ Able to delete newly created light.')
        .addSubcommand(sub => sub
            .setName('light')
            .setDescription('🗑️ Delete newly created light.')
        )
    )
    .addSubcommandGroup((group)=> group
        .setName('list')
        .setDescription('📋 Able to fetch light lists.')
        .addSubcommand(sub => sub
            .setName('light')
            .setDescription('📋 just fetch all light lists.')
        )
    )
    .addSubcommandGroup((group)=> group
        .setName('control')
        .setDescription('🕹️ Able to control your home lights')
        .addSubcommand(sub => sub
            .setName('interface')
            .setDescription('🕹️ just control the light from Discord bot.')
        )

    )


export default control_light;