import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import usersRouter from "./routers/usersRouter";
import studentsRouter from "./routers/studentsRouter";
import { ROUTES_CONFIG, PATH_PREFIXES } from "@/configs/routers.config";
import { PORT, FILE_PATH } from "@/server.config";
import defaultErrorMiddleware from "@/middlewares/defaultErrorMiddleware";

const app = express();

// access files via URL : http://localhost:3002/files/images/students/????.jpg
app.use("/files", express.static(FILE_PATH));

// Middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(
  "/ping",
  ...[
    (_, __, next) => {
      console.log("ping 1");
      next();
    },
    (_, __, next) => {
      console.log("ping 2");
      next();
    },
    (_, __, next) => {
      console.log("ping 3");
      next();
    },
    (_, res, next) => {
      console.log("ping 4");

      res.send("pong");
    },
  ]
);

// path: /api
app.use(`${PATH_PREFIXES.API}${ROUTES_CONFIG.USERS.baseURL}`, usersRouter);
app.use(
  `${PATH_PREFIXES.API}${ROUTES_CONFIG.STUDENTS.baseURL}`,
  studentsRouter
);

app.use(defaultErrorMiddleware);

app.listen(PORT, () => {
  console.log(`[server] Application is listening on port ${PORT}`);
  console.log('[Server] uploads are located in "' + FILE_PATH + '"');
});
