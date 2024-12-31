import { DEFAULT_SCHEMA_NAME } from "@/configs/database";
import executeSQLQuery from "@/database/operations/executeSQLQuery";
import { IUpdateUserBody } from "@/interfaces/users.interface";
import { responseJSONTemplate } from "@/utils/api";
import { encryptPassword } from "@/utils/auth";
import { Response, Request } from "express";

const SQL_UPDATE_USER_BY_ID = `
UPDATE ${DEFAULT_SCHEMA_NAME}.users

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
    } else if (!password) {
      throw new Error("No password found");
    }

    const encryptedPassword = encryptPassword(password);

    const result = (await executeSQLQuery(SQL_UPDATE_USER_BY_ID, [
      username,
      encryptedPassword,
      isActive,
      userID,
    ])) as {
      rows: { id: number }[];
    };

    const updatedID = result.rows?.[0]?.id || null;

    if (!updatedID) {
      throw new Error("No Update User Updated ID found");
    }

    res.json(
      responseJSONTemplate({
        success: true,
        error: null,
        data: {
          updatedID,
        },
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
