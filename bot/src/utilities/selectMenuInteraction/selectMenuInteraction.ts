import { Client, Interaction } from "discord.js";
import is_select_light from "./actions/select-light";
import is_light_switch from "./actions/light-switch";

export default async function selectMenuInteraction(client : Client, interaction : Interaction){
    await is_select_light(interaction);
    await is_light_switch(interaction);
}