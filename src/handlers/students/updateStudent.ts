import { DEFAULT_SCHEMA_NAME } from "@/configs/database";
import { executeSQLQuery } from "@/database/operations";
import { IUpdateStudentRecord } from "@/interfaces/students.interface";

const SQL = `
UPDATE ${DEFAULT_SCHEMA_NAME}.students

SET 
    reference_id=COALESCE($2, reference_id),
    firstname=COALESCE($3, firstname), 
    lastname=COALESCE($4, lastname),
    middlename=COALESCE($5, middlename),
    username=COALESCE($6, username),
    password=COALESCE($7, password),
    is_active=COALESCE($8, is_active),
    image_url=COALESCE($9, image_url)

WHERE id = $1

RETURNING id,reference_id,firstname,lastname,middlename,username,is_active,image_url
`;

const updateStudent = async (params: IUpdateStudentRecord) => {
  const {
    id,
    reference_id,
    firstname,
    lastname,
    middlename,
    username,
    password,
    is_active,
    image_url,
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
    image_url,
  ];

  const response = executeSQLQuery(SQL, updateParams);

  return response;
};

export default updateStudent;
