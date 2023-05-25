import { Context } from "https://deno.land/x/oak/mod.ts";

const welcome = (ctx : Context) => {
    ctx.response.body = "Welcome From The Deno Land.";
}

const getAllLights = (ctx: Context) => {
  ctx.response.body = 'getAllLights';
};
const getLight = (ctx : Context) => {
    ctx.response.body = 'getLights';
}

const createLight = (ctx : Context) => {
    ctx.response.body = 'createLight';
}

const updateLight = (ctx : Context) => {
    ctx.response.body = 'updateLight';
}

const deleteLight = (ctx : Context) => {
    ctx.response.body = 'deleteLight';
}

export { welcome, getAllLights, getLight , createLight , updateLight , deleteLight}