import { Dayjs } from 'dayjs';
import { v4 as uuid } from 'uuid';
import Recipient from './recipient';
import Script from './script';

export default class Scrape {
    id: string = uuid();
    url: string;
    name: string;
    recipient: Recipient;
    scripts: (Script | string)[] = [];
    created: string | Dayjs;
    lastExecuted?: string | Dayjs;
    timeout: number = 30 * 1000;
}