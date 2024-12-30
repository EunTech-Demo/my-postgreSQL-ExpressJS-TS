import { executeSQLQuery } from "@/database/operations";
import { IUserDTO } from "@/interfaces/users.interface";

const getAllUsers = async () => {
  const response = await executeSQLQuery("SELECT * FROM crud_system.users");

  const { rows } = response as {
    rows: IUserDTO[];
  };

  return rows;
};

export default getAllUsers;
