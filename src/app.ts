import express from "express";
import bodyParser from "body-parser";

import usersRouter from "./routers/usersRouter";
import studentsRouter from "./routers/studentsRouter";

import { ROUTES_CONFIG, PATH_PREFIXES } from "./configs/routers.config";

const app = express();
const PORT = process?.env?.PORT || 3002;

// Middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (_, res) => {
  res.send("pong");
});

// /api
app.use(`${PATH_PREFIXES.API}${ROUTES_CONFIG.USERS.baseURL}`, usersRouter);
app.use(
  `${PATH_PREFIXES.API}${ROUTES_CONFIG.STUDENTS.baseURL}`,
  studentsRouter
);

app.listen(PORT, () => {
  console.log(`[server] Application is listening on port ${PORT}`);
});
