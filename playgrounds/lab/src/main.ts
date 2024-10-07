import { Mx } from "../../../packages/core/lib/mx";

const app = new Mx();

app.get("/", ({ reply }) => {
  reply.send("Hello World");
});

app.post("/", ({ reply, inquery }) => {
  reply.status(201).json({ message: "Hello World", payload: inquery.body });
});

app.put("/", ({ reply }) => {
  reply.status(202).html("<h1>Hello World</h1>");
});

app.delete("/", ({ reply }) => {
  reply.sendStatus(204);
});

app.listen(3000, "127.0.0.1", () => {
  console.log("server started");
});
