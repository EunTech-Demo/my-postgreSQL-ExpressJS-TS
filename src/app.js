const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("src/app.js -> Hello World!");
});

app.listen(PORT, () => {
  console.log(`Express.js app listening on port ${PORT}`);
});
