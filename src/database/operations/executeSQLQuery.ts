import initializeDB from "../initializeDB";

const executeSQLQuery = async (sql: string, params: any[] = []) => {
  try {
    const response = await initializeDB().query(sql, params);

    return response;
  } catch (error) {
    throw new Error(error?.message || error);
  }
};

export default executeSQLQuery;
