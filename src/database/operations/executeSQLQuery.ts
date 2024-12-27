import initializeDB from "../initializeDB";

const executeSQL = async (sql: string, params: any[] = []) => {
  try {
    const response = await initializeDB().query(sql, params);

    return response;
  } catch (error) {
    return `${error}`;
  }
};

export default executeSQL;
