import dayjs, { Dayjs } from "dayjs";

export default class Frequency {
    private constructor({
        minutes = 0,
        hours = 0,
        days = 0 
    }) {
        this.minutes = minutes;
        this.hours = hours;
        this.days = days;
    }

    static every(amount: number, interval: 'minutes' | 'hours' | 'days'): Frequency {
        return new Frequency({ [interval]: amount });
    }

    nextExecution(lastExecution: Dayjs | string): Dayjs {
        const lastExecutionDate = dayjs(lastExecution);
        return lastExecutionDate.add(this.minutes, 'minute').add(this.hours, 'hour').add(this.days, 'day');
    }
    
    /** every x minutes */
    minutes: number = 0;
    /** every x hours */
    hours: number = 0;
    /** every x days */
    days: number = 0;

    /** script returns (true -> run) (false -> don't) */
    script: (() => boolean) | null = null;
}