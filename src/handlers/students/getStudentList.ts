import { executeSQLQuery } from "@/database/operations";

const SQL = `SELECT 
    id,
    username,
    is_active
    reference_id,
    firstname,
    lastname,
    middlename

FROM lms_system. students


WHERE
    $1::TEXT IS NULL OR $1 = '' OR lastname LIKE $1::TEXT;
`;

const getStudentList = async () => {
  const response = await executeSQLQuery(SQL, []);

  return response;
};

export default getStudentList;
