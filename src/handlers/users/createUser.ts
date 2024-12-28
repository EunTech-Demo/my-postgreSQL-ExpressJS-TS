import { executeSQLQuery } from "@/database/operations";

const SQL_INSERT_NEW_USER = `
INSERT INTO crud_system.users(
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

  return await executeSQLQuery(SQL_INSERT_NEW_USER, [username, password]);
};

export default createUser;
