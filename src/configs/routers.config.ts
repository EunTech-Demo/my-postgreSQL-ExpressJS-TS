export const ROUTES_CONFIG = {
  USERS: {
    baseURL: "/users",
    paths: {
      GET_ALL: "/", // by criteria
      GET_BY_ID: "/:id",
      CREATE_USER: "/create",
      UPDATE_USER_BY_ID: "/update/:id",
    },
  },
  STUDENTS: {
    baseURL: "/students",
    paths: {
      GET_ALL: "/",
      GET_BY_ID: "/:id",
      CREATE_STUDENT: "/create",
      UPDATE_STUDENT_BY_ID: "/update/:id",
    },
  },
};

export const PATH_PREFIXES = {
  API: "/api",
};
