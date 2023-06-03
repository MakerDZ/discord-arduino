import { ActionRowBuilder, SelectMenuBuilder } from "@discordjs/builders";

export default function control_light_status(index_number : string, name : string , status : string){
    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
        new SelectMenuBuilder()
          .setCustomId('control_light') 
          .setPlaceholder('​switch')
          .setMinValues(0)
          .setMaxValues(1) 
          .addOptions(
            {
                label : "on",
                value : `1 ${index_number}`
            },
            {
                label : "off",
                value : `0 ${index_number}`
            }
          ),
    );
    return {
        "components": [row],
        "embeds": [
          {
            "title": `🕹️ This is Light Switch`,
            "description": `${name} is turned ${status}. \n\n`,
            "color": 0xED1A7D,
            "image": {
              "url": `https://us-east-1.tixte.net/uploads/ajax.tixte.co/switch.png`,
              "height": 0,
              "width": 0
            }
          }
        ],
        ephemeral: true
    };
}