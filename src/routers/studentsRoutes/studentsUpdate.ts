import { updateStudent } from "@/handlers/students";
import { IUpdateStudentBody } from "@/interfaces/students.interface";
import {
  ALLOWED_IMAGE_TYPES,
  STUDENT_IMAGE_BASE_URL,
  STUDENT_IMG_PATH,
} from "@/server.config";
import { responseJSONTemplate } from "@/utils/api";
import { encryptPassword } from "@/utils/auth";
import {
  generateFileNameFromRequest,
  isFileUploadedSuccessfully,
} from "@/utils/files";
import { fileUploader } from "@/utils/upload";
import { Response, Request } from "express";

const updateStudentImageMiddleware = fileUploader(
  STUDENT_IMG_PATH,
  ALLOWED_IMAGE_TYPES,
  "Student Image Not Updated",
  "username"
).single("image_file");

const studentsUpdate = async (
  req: Request,
  res: Response,
  next: (err: Error) => void
) => {
  try {
    const { id } = req.params as {
      id: string;
    };

    const reqBody = { ...req.body } as IUpdateStudentBody;
    const isStudentImgUpdated = isFileUploadedSuccessfully(req);
    const imgPath = isStudentImgUpdated
      ? generateFileNameFromRequest({
          req,
          baseURL: STUDENT_IMAGE_BASE_URL,
        })
      : null;

    const updateStudentParams = {
      ...reqBody,
      id: Number(id),
      ...(reqBody?.password && { password: encryptPassword(reqBody.password) }),
      ...(imgPath && { image_url: imgPath }),
    };

    const response = (await updateStudent(updateStudentParams)) as {
      rows: { id: number }[];
    };

    const updatedRowID = response?.rows[0]?.id;

    if (!updatedRowID) {
      throw new Error(`No Student entry updated: ID-${id}`);
    }

    res.json(
      responseJSONTemplate({
        success: true,
        error: null,
        data: {
          updatedID: response.rows,
          isStudentImgUpdated,
        },
        message: null,
        status: 200,
      })
    );
  } catch (error) {
    next(error);
  }
};

export default [updateStudentImageMiddleware, studentsUpdate];
