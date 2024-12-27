import pg, { ClientConfig } from "pg";

const POSTGRESQL_SAMPLE_CRUD_DB: ClientConfig = {
  host: "127.0.0.1",
  port: 5433,
  database: "sample-crud",
  user: "postgres",
  password: "root",
};

const initializeDB = () => {
  const pool = new pg.Pool(POSTGRESQL_SAMPLE_CRUD_DB);

  return pool;
};

export default initializeDB;
