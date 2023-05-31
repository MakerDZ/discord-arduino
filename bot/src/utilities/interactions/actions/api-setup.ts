import { ChatInputCommandInteraction , Interaction, GuildMember } from "discord.js";
import db from "../../../libraries/common/dbConnection";
import action_success from "../../../components/common/action_success";
import no_permission from "../../../components/common/no_permission";

export default async function is_api_setup(Interaction : Interaction){
    const interaction = Interaction as ChatInputCommandInteraction;
    const member = interaction.member as GuildMember;
    const isAdmin = member.permissions.has("Administrator");
    if(interaction.commandName !== "api") return;
    if(!isAdmin){
        interaction.reply(no_permission());
    }else{
        const api_url = interaction.options.get('api_url')?.value as string;
        const api_token = interaction.options.get('api_token')?.value as string;
        db.addData("api_url", api_url);
        db.addData("api_token", api_token);
        interaction.reply(action_success());;
    }
}