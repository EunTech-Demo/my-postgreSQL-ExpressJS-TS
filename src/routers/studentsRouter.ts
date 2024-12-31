import { ROUTES_CONFIG } from "@/configs/routers.config";
import { responseJSONTemplate } from "@/utils/api";
import { Router } from "express";
import { studentsCreate } from "./studentsRoutes";
import { fileUploader } from "@/utils/upload";
import { ALLOWED_IMAGE_TYPES, STUDENT_IMG_PATH } from "@/server.config";

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
  fileUploader(
    STUDENT_IMG_PATH,
    ALLOWED_IMAGE_TYPES,
    "Student Image Not Uploaded",
    "username"
  ).single("image_file"),
  studentsCreate
);

export default studentsRouter;
