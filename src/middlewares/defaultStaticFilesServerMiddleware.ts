import { FILE_PATH } from "@/server.config";
import express, { Express as ExpressInterface, Request } from "express";

/**
 * A middleware that serves static files from the `FILE_PATH` directory.
 *
 * It also checks if the request has an "authorization" header.
 * If the header is present, the request is allowed to access the files.
 * If the header is not present, the middleware will return a 401 error.
 *
 * Example:
 * When you access `http://localhost:3002/files/images/students/????.jpg`
 *
 *  * If the header is present, it will serve the file from the `FILE_PATH` directory.
 * If the header is not present, it will return a 401 error.
 *
 * @param {ExpressInterface} app The Express app
 */
const defaultStaticFilesServerMiddleware = (app: ExpressInterface) => {
  app.use("/files", (req: Request, __, next) => {
    const isAuthorized = !!req?.headers?.["authorization"];
    console.log("[Static Files] accessing files:", {
      url: req.url,
      isAuthorized,
    });

    next(isAuthorized ? null : "No Authorization token found");
  });
  app.use("/files", express.static(FILE_PATH));
};

export default defaultStaticFilesServerMiddleware;
