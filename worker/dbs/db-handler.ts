import { DbStructure } from "../../types/db-structure";
import TableHandler from "./table-hanlder";

export default abstract class DbHandler {
    abstract init(): Promise<void>;
    abstract shouldInit(): boolean;
    abstract getTable<K extends keyof DbStructure, T extends DbStructure[K][string]>(table: K): TableHandler<K, T>;
    abstract refresh(): Promise<void>;
}