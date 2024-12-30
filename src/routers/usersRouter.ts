import { Router } from "express";

import { ROUTES_CONFIG } from "@/configs/routers.config";
import { usersCreate, usersGetAll, usersUpdate } from "./usersRoutes";

const usersRouter = Router();
const { USERS } = ROUTES_CONFIG;
const { paths } = USERS;

const usersRouterMiddleware = (req, _, next) => {
  console.log("[usersRouter.middleware]: " + req.method + " " + req.url);

  next();
};

usersRouter.use(usersRouterMiddleware);

usersRouter.get(paths.GET_ALL, usersGetAll);
usersRouter.get(paths.GET_BY_ID, (req, res) => {
  res.send("get user by id: " + req?.params?.id || "- NO ID - ");
});

// create new user with username & password
usersRouter.post(paths.CREATE_USER, usersCreate);

// update user by id
usersRouter.put(paths.UPDATE_USER_BY_ID, usersUpdate);

export default usersRouter;
