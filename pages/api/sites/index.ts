import type { NextApiRequest, NextApiResponse } from 'next'
import Sites from '../../../types/sites';
import { Db } from '../../../api-db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Sites | string>
) {
    if (Db.shouldInit())
        await Db.init();

    switch (req.method) {
        case 'GET':
            res.status(200).json(await Db.getTable("sites").getAll());
            break;
        case 'POST':
            res.status(200).json(await Db.getTable("sites").create(req.body));
            break;
        default:
            res.status(404);
            break;
    }

    res.end();
}
