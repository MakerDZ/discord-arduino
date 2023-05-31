import { group } from "console";
import { SlashCommandBuilder } from "discord.js";

const add_permission = new SlashCommandBuilder()
    .setName('user')
    .setDescription('⭐️ Manage User Permissions')
    .addSubcommandGroup((group) => group
        .setName('add')
        .setDescription('🔒 Add User Permission')
        .addSubcommand(sub => sub
            .setName('permission')
            .setDescription('🕹️ Add User Permission To Control Lights')
            .addUserOption(option => option
                .setName('add_user')
                .setDescription('💁 Choose A User')
                .setRequired(true)
            ) 
        )    
    )
    .addSubcommandGroup((group) => group
        .setName('remove')
        .setDescription('🔒 Remove User Permission')
        .addSubcommand(sub => sub
            .setName('permission')
            .setDescription('🕹️ Rmove User Permission To Control Lights')
            .addUserOption(option => option
                .setName('remove_user')
                .setDescription('💁 Choose A User')
                .setRequired(true)
            ) 
        )    
    )
    .addSubcommandGroup((group) => group
        .setName('fetch')
        .setDescription('👀 Show List Of Users Who Have Permission')
        .addSubcommand(sub => sub
            .setName('permission')
            .setDescription('🕹️ Show Users Who Have Permission To Control Lights')
        )    
    )
    
export default add_permission;