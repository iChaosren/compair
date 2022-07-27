import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises';
import PuppetMaster from '../../worker/puppet-master';

const previewPuppet = new PuppetMaster();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const url = req.query.url as string;
    if (!url) {
        res.status(400).end();
        return;
    }

    if (!previewPuppet.browser)
        await previewPuppet.init();

    switch (req.method) {
        case 'GET':
            await previewPuppet.open({ url, timeout: 10000 });
            const screenshot: Buffer = await previewPuppet.takeScreenshot();
            res.send(screenshot as any)
            // res.send(await fs.readFile('test.jpg') as any)
            break;
        default:
            res.status(404);
            break;
    }

    res.end();
}
