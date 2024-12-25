const USER_ROUTE_BASE_URL = "/api/v1/users";

const usersMiddleware = (req, rest, next) => {
  console.log(
    `src/routes.users.usersRouter -> ${Date.now()} ${req.method} request to ${
      req.path
    }`
  );

  next();
};

const usersRouter = (app) => {
  app.use(USER_ROUTE_BASE_URL, usersMiddleware);

  // get all users
  app.get(USER_ROUTE_BASE_URL, (req, res) => {
    res.send("get all users");
  });

  // get all users v2
  app.get(USER_ROUTE_BASE_URL + "/v2", (req, res) => {
    res.send("get all users v2");
  });
};

module.exports = usersRouter;
