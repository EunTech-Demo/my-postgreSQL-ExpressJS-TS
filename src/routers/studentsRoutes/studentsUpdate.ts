import { updateStudent } from "@/handlers/students";
import { IUpdateStudentBody } from "@/interfaces/students.interface";
import { ALLOWED_IMAGE_TYPES, STUDENT_IMG_PATH } from "@/server.config";
import { responseJSONTemplate } from "@/utils/api";
import { encryptPassword } from "@/utils/auth";
import { fileUploader } from "@/utils/upload";
import { Response, Request } from "express";

export const updateStudentImageMiddleware = fileUploader(
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
    console.log("--GHId:", req.body);
    const { id } = req.params as {
      id: string;
    };

    const reqBody = { ...req.body } as IUpdateStudentBody;

    console.log("--reqBody: ", reqBody);
    const response = (await updateStudent({
      ...reqBody,
      id: Number(id),
      ...(reqBody?.password && { password: encryptPassword(reqBody.password) }),
    })) as { rows: { id: number }[] };

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
        },
        message: null,
        status: 200,
      })
    );
  } catch (error) {
    next(error);
  }
};

export default studentsUpdate;
