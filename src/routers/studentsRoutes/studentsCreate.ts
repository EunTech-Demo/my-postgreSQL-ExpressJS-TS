import { Request, Response } from "express";

import { createStudent } from "@/handlers/students";
import { generateStudentUUID } from "@/utils/students";
import { IInsertStudentBody } from "@/interfaces/students.interface";
import { responseJSONTemplate } from "@/utils/api";
import { encryptPassword } from "@/utils/auth";
import { generateFileNameFromRequest } from "@/utils/files";
import {
  ALLOWED_IMAGE_TYPES,
  STUDENT_IMAGE_BASE_URL,
  STUDENT_IMG_PATH,
} from "@/server.config";
import { fileUploader } from "@/utils/upload";

const insertStudentImgUploadMiddleware = fileUploader(
  STUDENT_IMG_PATH,
  ALLOWED_IMAGE_TYPES,
  "Student Image Not Uploaded",
  "username"
).single("image_file");

/**
 * @api {post} /students/create Create a new student
 * @apiName CreateStudent
 * @apiGroup Students
 *
 * @apiParam {String} firstname Student's first name
 * @apiParam {String} lastname Student's last name
 * @apiParam {String} middlename Student's middle name
 * @apiParam {String} username Student's username
 * @apiParam {String} password Student's password
 * @apiParam {Boolean} is_active Student's active status
 * @apiParam {File} image_file Student's image (optional)
 *
 * @apiSuccess {Boolean} success True if the student was created successfully
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data An object with the inserted student's ID
 * @apiSuccess {Number} status HTTP status code
 *
 * @apiError {String} error Error message
 * @apiError {Boolean} success False if the student was not created successfully
 * @apiError {Object} data Null if the student was not created successfully
 * @apiError {Number} status HTTP status code
 */
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

export default [insertStudentImgUploadMiddleware, studentsCreate];
