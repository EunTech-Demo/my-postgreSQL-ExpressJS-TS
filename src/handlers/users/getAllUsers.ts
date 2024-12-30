import { DEFAULT_SCHEMA_NAME } from "@/configs/database";
import { executeSQLQuery } from "@/database/operations";
import { IUserDTO } from "@/interfaces/users.interface";
import { generateWildcardSearch } from "@/utils/sql";

const SQL_GET_ALL_USERS = `
SELECT *

FROM ${DEFAULT_SCHEMA_NAME}.users

WHERE 
  $1::TEXT IS NULL OR $1 = '' OR username LIKE $1::TEXT

ORDER BY created_at DESC
`;

const getAllUsers = async ({ username }) => {
  const response = await executeSQLQuery(SQL_GET_ALL_USERS, [
    generateWildcardSearch(username),
  ]);

  const { rows } = response as {
    rows: IUserDTO[];
  };

  return rows;
};

export default getAllUsers;
