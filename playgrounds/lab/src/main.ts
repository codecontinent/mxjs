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

posts.post("/:one/abc", (ctx) => {
  ctx.reply.status(200).json({
    one: ctx.params.one,
    two: ctx.params.two,
    three: ctx.params.three,
  });
});

posts.post(
  "/a/:a/b/:b/c/:c/d/:d/e/:e/f/:f/g/:g/h/:h/i/:i/j/:j/k/:k/l/:l/m/:m/n/:n/o/:o/p/:p/q/:q/r/:r/s/:s/t/:t/u/:u/v/:v/w/:w/x/:x/y/:y/z/:z",
  (ctx) => {
    ctx.reply.status(200).json({
      params: ctx.params,
    });
  },
);

posts.put("/:id", (ctx) => {
  ctx.reply.status(202).json({ id: ctx.params.id });
});

posts.put("/:id/head", (ctx) => {
  ctx.reply.status(200).json({ id: ctx.params.id });
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
