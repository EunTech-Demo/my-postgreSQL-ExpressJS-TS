import { ROUTES_CONFIG } from "@/configs/routers.config";
import { responseJSONTemplate } from "@/utils/api";
import { Router } from "express";
import {
  studentsCreate,
  studentsGetList,
  studentsUpdate,
} from "./studentsRoutes";
import { fileUploader } from "@/utils/upload";
import { ALLOWED_IMAGE_TYPES, STUDENT_IMG_PATH } from "@/server.config";
import { updateStudentImageMiddleware } from "./studentsRoutes/studentsUpdate";

const studentsRouter = Router();

studentsRouter.use((req, res, next) => {
  console.log("[studentsRouter.middleware]: " + req.method + " " + req.url);
  next();
});

studentsRouter.get(ROUTES_CONFIG.STUDENTS.paths.GET_ALL, studentsGetList);

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

studentsRouter.put(
  ROUTES_CONFIG.STUDENTS.paths.UPDATE_STUDENT_BY_ID,
  ...[updateStudentImageMiddleware, studentsUpdate]
);

export default studentsRouter;
