import { Router } from "express";

import { ROUTES_CONFIG } from "@/configs/routers.config";
import { createUser, getAllUsers } from "@/handlers/users";
import { responseJSONTemplate } from "@/utils/api";

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

usersRouter.post(paths.CREATE_USER, async (req, res) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  try {
    const response = (await createUser({ password, username })) as {
      rowCount: number;
      rows: { id: number }[];
    };

    const insertID = response.rows[0].id;

    res.json(
      responseJSONTemplate({
        success: true,
        error: null,
        data: { insertID },
        message: `User Created Successfully`,
        status: 200,
      })
    );
  } catch (error) {
    const errMsg = error?.message || error;
    const regex = /\bduplicate\b/i;
    const isDuplicate = `${errMsg}`.match(regex);

    res.json(
      responseJSONTemplate({
        success: false,
        error: isDuplicate ? `User already exists` : errMsg,
        data: null,
        message: null,
        status: 500,
      })
    );
  }
});

usersRouter.put(paths.UPDATE_USER_BY_ID, (_, res) => {
  res.send("update user now");
});

export default usersRouter;
