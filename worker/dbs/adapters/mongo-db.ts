import { Mongoose } from 'mongoose';
import { DbStructure } from '../../../types/db-structure';
import DbHandler from '../db-handler';
import TableHandler from '../table-hanlder';
import WhereComparer from '../where-comparer';

export default class MongoDbTable<T extends keyof DbStructure, K extends DbStructure[T][string]> extends TableHandler<T, K> {
    getAll(): Promise<{ [id: string]: K; }> {
        throw new Error('Method not implemented.');
    }
    get(id: string): Promise<K> {
        throw new Error('Method not implemented.');
    }
    create(data: K): Promise<string> {
        throw new Error('Method not implemented.');
    }
    update(id: string, data: Partial<K>): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    where<E extends keyof K, S extends K[E]>(where: { [key in E]: { compare: WhereComparer; value: S; }; }): Promise<K[]> {
        throw new Error('Method not implemented.');
    }
}

export class MongoDbHandler extends DbHandler {
    init(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    shouldInit(): boolean {
        throw new Error('Method not implemented.');
    }
    getTable<K extends keyof DbStructure, T extends DbStructure[K][string]>(table: K): TableHandler<K, T> {
        throw new Error('Method not implemented.');
    }
    refresh(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}