import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import dayjs from 'dayjs';
import { setTimeout } from 'timers/promises';
import sleep from '../helpers/sleep';
import Site from '../types/site';
import { LowDbHandler } from './dbs/adapters/low-db';
import DbHandler from './dbs/db-handler';
import PuppetMaster from './puppet-master';

//const Db: DbHandler = new (DbAdapters as any)[`${process.env.DB_HANDLER || 'Low'}DbHandler`]();
const Db: DbHandler = new LowDbHandler();

const worker = async () => {
    console.log("Init DB");
    await Db.init();
    console.log("Init PuppetMaster");
    const puppetMaster = new PuppetMaster();
    puppetMaster.init();

    const sites = Db.getTable('sites');
    //const scripts = Db.getTable('scripts');
    const allSites = await sites.getAll();
    console.debug("Sites:", allSites);

    while (true) {
        const queuedSites: Site[] = [];
        for (const siteId in allSites) {
            const site = allSites[siteId];
            if (site.enabled)
                queuedSites.push(site);
        }
        const upcomingExecutions = queuedSites.sort((a, b) => a.nextExecution().isBefore(b.nextExecution()) ? 1 : -1);

        if (upcomingExecutions.length > 0) {

            const nextComparison = upcomingExecutions[0];

            const nextExecutionTime = nextComparison.nextExecution().diff(dayjs(), 'milliseconds');
            if (nextExecutionTime > 0)
                await setTimeout(nextExecutionTime);

            const now = dayjs();
            const executableCompares = upcomingExecutions.filter(s => s.nextExecution().isBefore(now) || s.nextExecution().isSame(now));

            console.debug("Executing:", executableCompares);

            for (let i = 0; i < executableCompares.length; i++) {
                const current = executableCompares[i];
                await puppetMaster.open(current);
                const isSame = await puppetMaster.compare(current);

                if (!isSame)
                    current.recipient.notify(current);

                await puppetMaster.close();
            }
        } else {
            await sleep(1000);
        }
    }
}

worker().catch((e) => console.error(e));
