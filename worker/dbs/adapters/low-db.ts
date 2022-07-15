import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import DefaultDb, { DbStructure } from '../../../types/db-structure';
import DbHandler from '../db-handler';
import TableHandler from '../table-hanlder';
import { v4 as uuid } from 'uuid';
import WhereComparer from '../where-comparer';
import {dynamicImport} from 'tsimportlib';

export class LowDbTable<T extends keyof DbStructure, K extends DbStructure[T][string]> extends TableHandler<T, K> {
    db: any;

    constructor(table: T, db: any) {
        super();
        this.table = table;
        this.db = db;
    }

    async getAll() {
        if(!this.db.data)
            await this.db.read();
        return this.db.data[this.table] as { [id: string]: K; };
    }

    async get(id: string): Promise<K> {
        if(!this.db.data)
            await this.db.read();
            
        return this.db.data[this.table][id] as K;
    }

    async create(data: K): Promise<string> {
        if(!this.db.data)
            await this.db.read();

        const id = data.id ? data.id : uuid();
        this.db.data[this.table][id] = data;
        await this.db.write();
        return id;
    }

    async update(id: string, data: K): Promise<boolean> {
        if(!this.db.data)
            await this.db.read();

        this.db.data[this.table][id] = Object.assign(this.db.data[this.table][id], data)
        await this.db.write();
        return true;
    }

    async delete(id: string): Promise<boolean> {
        if(!this.db.data)
            await this.db.read();

        delete this.db.data[this.table][id];
        await this.db.write();
        return true;
    }

    async where<E extends keyof K, S extends K[E]>(where: { [key in E]: { compare: WhereComparer, value: S } }): Promise<K[]> {
        if(!this.db.data)
            await this.db.read();
            
        return Object.values(this.db.data[this.table] as S).filter(entry => {
            for (const key in where) {
                switch (where[key].compare) {
                    case 'equals':
                        if (entry[key] !== where[key].value)
                            return false;
                    case 'not-equals':
                        if (entry[key] === where[key].value)
                            return false;
                    default:
                        console.error(`[${where[key].compare}] - Not implemented yet`);
                        return false;
                }
            }
            return true;
        });
    }
}

export class LowDbHandler extends DbHandler {
    
    db: any;

    async init() {
        // See issue regarding Commonjs dynamic imports: https://github.com/TypeStrong/ts-node/discussions/1290
        const { JSONFile, Low } = await dynamicImport('lowdb', module) as typeof import('lowdb');
        const __dirname = dirname(__filename);
        const dbPath = join(__dirname, '../../../../db/db.json');
        const adapter = new JSONFile(dbPath);
        this.db = new Low(adapter);
        await this.db.read();
        this.db.data ||= DefaultDb;
    }

    async refresh(): Promise<void> {
        await this.db.read();
    }

    getTable<K extends keyof DbStructure, T extends DbStructure[K][string]>(table: K): TableHandler<K, T> {
        return new LowDbTable<K, T>(table, this.db)
    }
}