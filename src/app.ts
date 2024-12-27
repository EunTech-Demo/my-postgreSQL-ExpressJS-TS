import express from "express";

import usersRouter from "./routers/usersRouter";
import { ROUTES_CONFIG } from "./configs/routers.config";

const app = express();
const PORT = process?.env?.PORT || 3002;

app.get("/ping", (_, res) => {
  res.send("pong");
});

// API
app.use("/api" + ROUTES_CONFIG.USERS.baseURL, usersRouter);

app.listen(PORT, () => {
  console.log(`[server] Application is listening on port ${PORT}`);
});
