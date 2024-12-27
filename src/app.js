const express = require("express");
const app = express();
const port = 3001;

const pgSQL = require("./helpers/pgSQL");

console.log("[server]: Server initializing...: ", pgSQL.p);

app.get("/ping", (req, res) => {
  res.send("Ping Server Success!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
