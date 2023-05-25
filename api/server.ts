import { Application } from "https://deno.land/x/oak/mod.ts";
import { env } from './config.ts'
import router from "./routers/contorlLight.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: +env.PORT });
console.log(`Server is up and running at ${env.PORT}.`);