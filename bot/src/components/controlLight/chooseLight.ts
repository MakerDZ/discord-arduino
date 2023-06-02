import { ActionRowBuilder, SelectMenuBuilder } from "@discordjs/builders";

export default function choose_light(lights : Array<{label : string, value : string}>){
    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
        new SelectMenuBuilder()
          .setCustomId('choose_light') 
          .setPlaceholder('​select light')
          .setMinValues(0)
          .setMaxValues(1) 
          .addOptions(...lights),
    );
    return {
        "components": [row],
        "embeds": [
          {
            "title": `💡 Choose Light To Control`,
            "description": "",
            "color": 0xF7B72A,
            "image": {
              "url": `https://us-east-1.tixte.net/uploads/ajax.tixte.co/Control_Light.png`,
              "height": 0,
              "width": 0
            }
          }
        ],
        ephemeral: true
    };
}