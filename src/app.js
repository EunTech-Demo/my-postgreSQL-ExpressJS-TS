const express = require("express");
const app = express();
const port = 3001;

console.log("[server]: Server initializing...");

app.get("/ping", (req, res) => {
  res.send("Ping Server Success!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
