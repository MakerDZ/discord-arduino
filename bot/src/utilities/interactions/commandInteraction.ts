import { Client, CommandInteraction, Interaction } from "discord.js";
import is_ping_pong from "./actions/ping-pong";


class Handling{
    constructor(private Clienct : Client, private Interaction : Interaction){}
    get client(){
        return this.Clienct;
    }
    get interaction(){
        return this.Interaction;
    }
}

export default class Commands extends Handling{
    public async handle(){
        await is_ping_pong(this.interaction);
    }
}