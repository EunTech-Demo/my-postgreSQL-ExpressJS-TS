import { DEFAULT_SCHEMA_NAME } from "@/configs/database";
import { executeSQLQuery } from "@/database/operations";
import { IUpdateStudentBody } from "@/interfaces/students.interface";

const SQL = `
UPDATE ${DEFAULT_SCHEMA_NAME}.students

SET 
    reference_id=COALESCE($2, reference_id),
    firstname=COALESCE($3, firstname), 
    lastname=COALESCE($4, lastname),
    middlename=COALESCE($5, middlename),
    username=COALESCE($6, username),
    password=COALESCE($7, password),
    is_active=COALESCE($8, is_active)

WHERE id = $1

RETURNING *
`;

const updateStudent = async (params: IUpdateStudentBody) => {
  const {
    id,
    reference_id,
    firstname,
    lastname,
    middlename,
    username,
    password,
    is_active,
  } = params;

  const updateParams = [
    id,
    reference_id,
    firstname,
    lastname,
    middlename,
    username,
    password,
    is_active,
  ];

  console.log("params: ", { updateParams });
  const response = executeSQLQuery(SQL, updateParams);

  return response;
};

export default updateStudent;
