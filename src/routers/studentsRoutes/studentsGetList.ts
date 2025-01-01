import { getStudentList } from "@/handlers/students";
import { responseJSONTemplate } from "@/utils/api";
import { Request, response, Response } from "express";

const studentsGetList = async (req: Request, res: Response) => {
  const { lastname = "" } = req.query;

  try {
    const response = (await getStudentList({
      lastname: `${lastname || ""}`,
    })) as {
      rows: {
        id: number;
        username: string;
        reference_id: boolean;
        firstname: string;
        lastname: string;
        middlename: string;
      }[];
    };

    res.json(
      responseJSONTemplate({
        success: true,
        error: null,
        data: response?.rows,
        message: null,
        status: 200,
      })
    );
  } catch (error) {
    res.json(
      responseJSONTemplate({
        success: false,
        error: error?.message || error,
        data: null,
        message: null,
        status: 500,
      })
    );
  }
};

export default studentsGetList;
