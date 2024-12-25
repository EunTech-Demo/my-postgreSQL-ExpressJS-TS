const initializeDB = require("../db/initializeDB");

const executePostgresQuery = async (query) => {
  const response = await initializeDB`${query}`;
};
