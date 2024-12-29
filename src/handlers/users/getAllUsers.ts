import { executeSQLQuery } from "@/database/operations";

export interface IUserDTO {
  id: number | string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string | null;
}

const getAllUsers = async () => {
  const response = await executeSQLQuery("SELECT * FROM crud_system.users");

  const { rows } = response as {
    rows: IUserDTO[];
  };

  return rows;
};

export default getAllUsers;
