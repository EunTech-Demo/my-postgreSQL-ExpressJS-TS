import bodyParser from "body-parser";
import { Express as ExpressInterface } from "express";

/**
 * Applies default middlewares to the Express app.
 *
 * @param {ExpressInterface} app The Express app
 */
const defaultInitialMiddleware = (app: ExpressInterface) => {
  // Middle wares
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

export default defaultInitialMiddleware;
