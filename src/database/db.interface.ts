import { PoolClient } from "pg";

export type SQLTransactionCallback = (_client: PoolClient) => Promise<void>;
