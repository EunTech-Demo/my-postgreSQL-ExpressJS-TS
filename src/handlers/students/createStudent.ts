import { executeSQLQuery } from "@/database/operations";
import { IInsertNewStudent } from "@/interfaces/students.interface";
import { QueryResult } from "pg";

const SQL = `
INSERT INTO lms_system.students(
  reference_id,
  firstname, 
  lastname, 
  middlename,
  username, 
  password, 
  is_active,
  image_url
)
VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8
)
  
RETURNING id
;`;

const createStudent: <T>(
  arg0: IInsertNewStudent
) => Promise<QueryResult<T>> = async (params) => {
  const {
    reference_id,
    firstname,
    lastname,
    middlename,
    username,
    password,
    is_active,
    image_url,
  } = params;

  const result = await executeSQLQuery(SQL, [
    reference_id,
    firstname,
    lastname,
    middlename,
    username,
    password,
    is_active,
    image_url,
  ]);

  return result;
};

export default createStudent;
