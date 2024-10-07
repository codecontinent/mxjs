import { Mx } from "../../../packages/core/lib/mx";

const app = new Mx();

app.get("/", (ctx) => {
  ctx.reply.end("Hello World");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("server started");
});
