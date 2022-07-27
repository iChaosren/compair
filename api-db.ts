import { LowDbHandler } from "./worker/dbs/adapters/low-db";
import DbHandler from "./worker/dbs/db-handler";

export const Db: DbHandler = new LowDbHandler();