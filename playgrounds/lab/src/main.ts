import { Gateway, MxJs } from "../../../packages/core/lib";

const app = new MxJs(); // (ROOT) Main Module

const users = new Gateway(); // Sub Module
const posts = new Gateway(); // Sub Module

app.get("/", (ctx) => {
  ctx.reply.json({ message: "Hello World" });
});

app.get("/status", (ctx) => {
  ctx.reply.json({ message: "OK" });
});

app.get("/cdn/*", (ctx) => {
  ctx.reply.json({ message: "CDN" });
});

// -------------------------

users.get("/", (ctx) => {
  ctx.reply.json({ users: [] });
});

users.get("/:id", (ctx) => {
  ctx.reply.json({ id: ctx.params.id });
});

users.post("/", (ctx) => {
  ctx.reply.status(201).json({ message: "UserCreated" });
});

users.put("/:id", (ctx) => {
  ctx.reply.status(202).json({ id: ctx.params.id });
});

users.delete("/:id", (ctx) => {
  ctx.reply.status(204).json({ id: ctx.params.id });
});

posts.get("/", (ctx) => {
  ctx.reply.json({ message: "Posts" });
});

posts.get("/:id", (ctx) => {
  ctx.reply.json({ id: ctx.params.id });
});

posts.put("/:id", (ctx) => {
  ctx.reply.status(202).json({ id: ctx.params.id });
});

posts.delete("/:id", (ctx) => {
  ctx.reply.status(204).json({ id: ctx.params.id });
});

const apiRouter = new Gateway();

apiRouter.module("/v1/user", users);
apiRouter.module("/v1/post", posts);

app.module("/api", apiRouter);

app.bootstrap().execute(3080, "127.0.0.1", () => {
  console.log("server started at http://localhost:3080");
});
