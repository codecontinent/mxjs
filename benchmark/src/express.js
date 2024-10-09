/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");

const app = express();

app.get("/", (_req, res) => {
  res.json({ hello: "world" });
  return;
});

app.listen(3991, () => {
  console.log("Express app is ready on port 3991 for benchmarking");
});
