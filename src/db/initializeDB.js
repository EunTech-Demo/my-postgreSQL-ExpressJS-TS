const postgres = require("postgres");

const POSTGRESQL_SAMPLE_CRUD_DB = {
  host: "127.0.0.1", // Postgres ip address[s] or domain name[s]
  port: 5433, // Postgres server port[s]
  database: "sample-crud", //"crud_system", // Name of database to connect to
  username: "postgres", // Username of database user
  password: "root",
};

const sql = postgres(POSTGRESQL_SAMPLE_CRUD_DB);

module.exports = sql;
