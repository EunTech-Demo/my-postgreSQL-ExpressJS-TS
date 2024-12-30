import executeSQLQuery from "@/database/operations/executeSQLQuery";
import { IUpdateUserBody } from "@/interfaces/users.interface";
import { responseJSONTemplate } from "@/utils/api";
import { Response, Request } from "express";

const SQL_UPDATE_USER_BY_ID = `
UPDATE crud_system.users

SET 
username=$1,
password=$2,
is_active=$3


WHERE id  = $4

RETURNING id
`;

const usersUpdate = async (req: Request, res: Response) => {
  const userID = req?.params?.id;
  const { username, password, isActive } = req.body as IUpdateUserBody;

  try {
    if (!userID) {
      throw new Error("No User ID found");
    }

    const result = await executeSQLQuery(SQL_UPDATE_USER_BY_ID, [
      username,
      password,
      isActive,
      userID,
    ]);

    res.json(
      responseJSONTemplate({
        success: true,
        error: null,
        data: result,
        message: `User Updated Successfully`,
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

export default usersUpdate;
