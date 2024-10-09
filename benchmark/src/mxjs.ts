// import { MxJs } from "../packages/core/lib";
import { MxJs } from "@mx/core";

const app = new MxJs();

app.get("/", ({ reply }) => {
  reply.json({ hello: "world" });
  return;
});

app.bootstrap().execute(3992, () => {
  console.log("MxJs app is ready on port 3992 for benchmarking");
});
