import { DEFAULT_SCHEMA_NAME } from "@/configs/database";
import { executeSQLQuery } from "@/database/operations";
import { encryptPassword } from "@/utils/auth";

const SQL_INSERT_NEW_USER = `
INSERT INTO ${DEFAULT_SCHEMA_NAME}.users(
	username,
	password
)

VALUES(
	$1,
	$2
)
	
RETURNING id;
`;

const createUser = async (arg0: { username: string; password: string }) => {
  const { username, password } = arg0;

  if (!password) {
    throw new Error("No password found");
  }

  const encryptedPassword = encryptPassword(password);

  return await executeSQLQuery(SQL_INSERT_NEW_USER, [
    username,
    encryptedPassword,
  ]);
};

export default createUser;
