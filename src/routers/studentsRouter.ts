import { ROUTES_CONFIG } from "@/configs/routers.config";
import { responseJSONTemplate } from "@/utils/api";
import { Router } from "express";
import { studentsCreate } from "./studentsRoutes";

const studentsRouter = Router();

// students middleware

studentsRouter.use((res, req, next) => {
  console.log("--- STUDENTS ROUTER MIDDLEWARE ---", {
    body: res.body,
  });
  next();
});

studentsRouter.get(ROUTES_CONFIG.STUDENTS.paths.GET_ALL, (req, res) => {
  res.json(
    responseJSONTemplate({
      success: true,
      error: null,
      data: null,
      message: null,
      status: 200,
    })
  );
});

// ** CREATE NEW STUDENT
studentsRouter.post(
  ROUTES_CONFIG.STUDENTS.paths.CREATE_STUDENT,
  studentsCreate
);

export default studentsRouter;
