import { PoolClient } from "pg";
import initializeDB from "../initializeDB";
import { SQLTransactionCallback } from "../db.interface";

const executeSQLTransaction = async (
  transactionCallback: SQLTransactionCallback
) => {
  const client = await initializeDB().connect();

  try {
    await client.query("BEGIN");
    await transactionCallback(client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export default executeSQLTransaction;
