import { Dayjs } from 'dayjs';
import { v4 as uuid } from 'uuid';
import Comparison from "./comparison";
import Frequency from "./frequency";
import Recipient from './recipient';
import Script from './script';

export default class Site {
    id: string = uuid();
    url: string;
    name: string;
    recipient: Recipient;
    comparison: Comparison;
    created: string | Dayjs;
    lastChecked?: string | Dayjs;
    start?: string | Dayjs;
    frequency: Frequency;
    scripts: (Script | string)[] = [];
    timeout: number = 30 * 1000;
    enabled: boolean = true;

    nextExecution(): Dayjs {
        this.frequency = new Frequency(this.frequency);
        return this.frequency.nextExecution(this.lastChecked ?? this.created);
    }
}