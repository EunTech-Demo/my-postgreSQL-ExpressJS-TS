import { DEFAULT_SCHEMA_NAME } from "@/configs/database";
import { executeSQLQuery } from "@/database/operations";
import { generateWildcardSearch } from "@/utils/sql";

const SQL = `SELECT 
    id,
    username,
    is_active
    reference_id,
    firstname,
    lastname,
    middlename

FROM ${DEFAULT_SCHEMA_NAME}.students


WHERE
  $1::TEXT IS NULL OR $1 = '' OR LOWER(lastname) LIKE LOWER($1::TEXT);
`;

const getStudentList = async (arg0: { lastname?: string }) => {
  const { lastname } = arg0;

  const response = await executeSQLQuery(SQL, [
    generateWildcardSearch(lastname),
  ]);

  return response;
};

export default getStudentList;
