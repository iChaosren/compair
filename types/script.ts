import { v4 as uuid } from 'uuid';

export default class Script {
    id: string = uuid();
    name: string;
    path: string;
}