import { Context } from "https://deno.land/x/oak/mod.ts";
import { env } from "../config.ts";

const apiAuth = async (ctx : Context , next: () => Promise<unknown>) => {
    const headers: Headers = ctx.request.headers;
    const authToken = headers.get('TOKEN');
    if(authToken !== env.API_AUTH_TOKEN){
        ctx.response.status = 401;
        ctx.response.body = {
            status: false,
            message: 'You are not authorized to access this endpoint.',
        };
    }else{
        await next();
    }
}


export default apiAuth;