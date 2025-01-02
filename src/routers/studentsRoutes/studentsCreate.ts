import { Request, Response } from "express";

import { createStudent } from "@/handlers/students";
import { generateStudentUUID } from "@/utils/students";
import { IInsertStudentBody } from "@/interfaces/students.interface";
import { responseJSONTemplate } from "@/utils/api";
import { encryptPassword } from "@/utils/auth";
import { generateFileNameFromRequest } from "@/utils/files";
import { STUDENT_IMAGE_BASE_URL } from "@/server.config";

const studentsCreate = async (req: Request, res: Response) => {
  const { firstname, lastname, middlename, username, password, is_active } =
    req.body as IInsertStudentBody;

  try {
    const responseCreateStudent = (await createStudent({
      reference_id: generateStudentUUID(),
      firstname,
      lastname,
      middlename,
      username,
      password: encryptPassword(password),
      is_active,
      image_url: generateFileNameFromRequest({
        req,
        baseURL: STUDENT_IMAGE_BASE_URL,
      }),
    })) as {
      rows: { id: number }[];
    };

    const insertID = responseCreateStudent.rows[0].id;

    res.json(
      responseJSONTemplate({
        success: true,
        error: null,
        data: { insertID },
        message: `Student Created Successfully`,
        status: 200,
      })
    );
  } catch (error) {
    const errMsg = error?.message || error;
    const regex = /\bduplicate\b/i;
    const isDuplicate = `${errMsg}`.match(regex);
    const displayError = isDuplicate ? `Student already exists` : errMsg;

    res.json(
      responseJSONTemplate({
        error: displayError,
        success: false,
        data: null,
        message: null,
        status: 400,
      })
    );
  }
};

export default studentsCreate;

// create new student
