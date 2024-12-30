import { createUser } from "@/handlers/users";
import { ICreateUserBody } from "@/interfaces/users.interface";
import { responseJSONTemplate } from "@/utils/api";
import { Response, Request } from "express";

const usersCreate = async (req: Request, res: Response) => {
  const { username, password } = req.body as ICreateUserBody;

  try {
    const response = (await createUser({ password, username })) as {
      rowCount: number;
      rows: { id: number }[];
    };

    const insertID = response.rows[0].id;

    res.json(
      responseJSONTemplate({
        success: true,
        error: null,
        data: { insertID },
        message: `User Created Successfully`,
        status: 200,
      })
    );
  } catch (error) {
    const errMsg = error?.message || error;
    const regex = /\bduplicate\b/i;
    const isDuplicate = `${errMsg}`.match(regex);

    res.json(
      responseJSONTemplate({
        success: false,
        error: isDuplicate ? `User already exists` : errMsg,
        data: null,
        message: null,
        status: 500,
      })
    );
  }
};

export default usersCreate;
