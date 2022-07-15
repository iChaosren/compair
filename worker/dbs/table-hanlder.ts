import { DbStructure } from "../../types/db-structure";
import WhereComparer from "./where-comparer";

export default abstract class TableHandler<TTableName extends keyof DbStructure, TEntry extends DbStructure[TTableName][string]> {
    table: TTableName;
    abstract getAll(): Promise<{ [id: string]: TEntry }>;
    abstract get(id: string): Promise<TEntry>;
    abstract create(data: TEntry): Promise<string>;
    abstract update(id: string, data: Partial<TEntry>): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
    abstract where<E extends keyof TEntry, S extends TEntry[E]>(where: { [key in E]: { compare: WhereComparer, value: S } }): Promise<TEntry[]>;
}