import { Router } from "express";

import { ROUTES_CONFIG } from "@/configs/routers.config";
import { getAllUsers } from "@/handlers/users";

const usersRouter = Router();
const { USERS } = ROUTES_CONFIG;
const { paths } = USERS;

const usersRouterMiddleware = (req, _, next) => {
  console.log("[usersRouter.middleware]: " + req.method + " " + req.url);

  next();
};
usersRouter.use(usersRouterMiddleware);

usersRouter.get(paths.GET_ALL, getAllUsers);
usersRouter.get(paths.GET_BY_ID, (req, res) => {
  res.send("get user by id: " + req?.params?.id || "- NO ID - ");
});
usersRouter.post(paths.CREATE_USER, (_, res) => {
  res.send("create user now");
});

usersRouter.put(paths.UPDATE_USER_BY_ID, (_, res) => {
  res.send("update user now");
});

export default usersRouter;
