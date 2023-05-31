import { Client, Interaction } from "discord.js";
import is_ping_pong from "./actions/ping-pong";
import is_api_setup from "./actions/api-setup";
import is_user_permission_setup from "./actions/user-permission";

export default async function commandInteraction(client : Client, interaction : Interaction) {
    await is_ping_pong(interaction);
    await is_api_setup(interaction);
    await is_user_permission_setup(interaction);
}