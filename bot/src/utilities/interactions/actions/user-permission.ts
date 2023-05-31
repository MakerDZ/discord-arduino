import { ChatInputCommandInteraction , Interaction, GuildMember } from "discord.js";
import db from "../../../libraries/common/dbConnection";
import action_success from "../../../components/common/action_success";
import no_permission from "../../../components/common/no_permission";
import send_any from "../../../components/common/send_any";

export default async function is_user_permission_setup(Interaction : Interaction){
    const interaction = Interaction as ChatInputCommandInteraction;
    const member = interaction.member as GuildMember;
    const isAdmin = member.permissions.has("Administrator");
    if(interaction.commandName !== "user") return;
    if(!isAdmin){
        await interaction.reply(no_permission());
    }else{
        const exist_users = await db.getData('users');
        switch(interaction.options.getSubcommandGroup()){
            case 'add':
                const new_user = interaction.options.get('add_user')?.value as string;
                if(exist_users == null){
                    await db.addData('users', [new_user]);
                    await interaction.reply(action_success());
                    break;
                }
                if(exist_users.indexOf(new_user) == -1){
                    await db.pushData('users', new_user);
                    await interaction.reply(action_success());
                    break;
                }
                await interaction.reply(send_any(0xF70031 , "🙎 You already added this user." , "you don't need to add again."));
                break;

            case 'remove':
                const remove_user  = interaction.options.get('remove_user')?.value as string;
                if(exist_users == null){
                    interaction.reply(send_any(0xF70031 , "🙎 You didn't even add any user." , "should add a user first."));
                    break;
                }
                if(exist_users.indexOf(remove_user) == -1){
                    interaction.reply(send_any(0xF70031 , "🙍 There is no mentioned user to remove." , "May be you already removed or haven't added."));
                    break;
                }
                await db.removeData('users' , remove_user);
                interaction.reply(action_success());
                break;
                
            case 'fetch':
                let message : string = "";
                if(exist_users == null){
                    await interaction.reply(send_any(0xFF10F0, "🤷 No User Added.","There is no user lists to show."));
                    break;
                }
                if(exist_users.length == 0){
                    await interaction.reply(send_any(0xFF10F0, "🤷 No User Added.","There is no user lists to show."));
                    break;
                }
                exist_users.forEach((user: string) => 
                    message += `<@${user}> \n`
                )
                await interaction.reply(send_any(0xFF10F0, "💡 Users who have permission to control light." ,message));
                break;
        }
        
    }
}