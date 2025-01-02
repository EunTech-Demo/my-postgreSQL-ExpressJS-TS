import dotenv from "dotenv";
dotenv.config(); // This will load environment variables from the .env file

import express, { NextFunction, Request, Response } from "express";
import compression from "compression";

import usersRouter from "./routers/usersRouter";
import studentsRouter from "./routers/studentsRouter";
import { ROUTES_CONFIG, PATH_PREFIXES } from "@/configs/routers.config";
import { PORT, FILE_PATH } from "@/server.config";
import defaultErrorMiddleware from "@/middlewares/defaultErrorMiddleware";
import defaultStaticFilesServerMiddleware from "./middlewares/defaultStaticFilesServerMiddleware";
import defaultInitialMiddleware from "./middlewares/defaultInitialMiddleware";

/**
 * Sets up the Express server and starts listening to the configured port.
 *
 * This function applies the following middlewares to the Express app:
 *
 * 1. Initial middlewares, including BodyParser and CORS.
 * 2. Serving static files from the `FILE_PATH` directory.
 * 3. Users router from `./routers/usersRouter`.
 * 4. Students router from `./routers/studentsRouter`.
 * 5. Default error middleware from `./middlewares/defaultErrorMiddleware`.
 *
 * Once all the middlewares are applied, it starts listening to the configured port.
 *
 * @returns {void}
 */
const runServer = () => {
  const app = express();
  app.use(compression());

  // Initial middlewares
  defaultInitialMiddleware(app);

  // Serving static file , such as images in order to access the uploaded files
  defaultStaticFilesServerMiddleware(app);

  app.get("/ping", (_: Request, res: Response) => {
    res.json({ message: "pong" });
  });

  app.get("/pingX", (_: Request, res: Response, next: NextFunction) => {
    next("ping error");
  });

  app.use(`${PATH_PREFIXES.API}${ROUTES_CONFIG.USERS.baseURL}`, usersRouter);
  app.use(
    `${PATH_PREFIXES.API}${ROUTES_CONFIG.STUDENTS.baseURL}`,
    studentsRouter
  );

  app.use(defaultErrorMiddleware);

  app.listen(PORT, process?.env?.HOST, () => {
    console.log("[Server] Environment:", process.env.NODE_ENV);
    console.log(
      `[Server] Application is listening on port ${process?.env?.HOST}:${PORT}`
    );
    console.log(`[Server] Uploads are located in ${FILE_PATH}`);
  });
};

runServer();
