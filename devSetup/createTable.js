const pg = require("pg");

const DEFAULT_SCHEMA_NAME = "lms_system";

const initDB = () => {
  const pool = new pg.Pool({
    host: "127.0.0.1",
    port: 5433,
    database: "sample-crud",
    user: "developer_all_access",
    password: "devroot",
    searchPath: [DEFAULT_SCHEMA_NAME],
  });

  return pool;
};

const SCHEMA_CREATION = `CREATE SCHEMA IF NOT EXISTS ${DEFAULT_SCHEMA_NAME}`;

const USERS_TBL = `
CREATE TABLE IF NOT EXISTS ${DEFAULT_SCHEMA_NAME}.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const STUDENTS_TBL = `
CREATE TABLE IF NOT EXISTS ${DEFAULT_SCHEMA_NAME}.students (
    id SERIAL PRIMARY KEY,
    reference_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_reference_id UNIQUE (reference_id)
)`;

const initCreateTables = async () => {
  const pool = initDB();

  try {
    const schemeCreated = await pool.query(SCHEMA_CREATION);
    console.log("[schemeCreated]: ", !!schemeCreated);

    const usersTableCreated = await pool.query(USERS_TBL);
    console.log("[usersTableCreated]: ", !!usersTableCreated);

    const studentsTableCreated = await pool.query(STUDENTS_TBL);
    console.log("[studentsTableCreated]: ", !!studentsTableCreated);
  } catch (error) {
    console.log("--- CREATE TABLES ERROR: ", error);
  }
};

initCreateTables();
