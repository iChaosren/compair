import type { NextApiRequest, NextApiResponse } from 'next'
import Site from '../../../types/site';
import { Db } from '../../../api-db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | boolean | Site>
) {
    const siteId = req.query.siteId as string;

    if (!siteId) {
        res.status(400).end();
        return;
    }

    if (Db.shouldInit())
        await Db.init();

    switch (req.method) {
        case 'GET':
            res.status(200).json(await Db.getTable("sites").get(siteId));
            break;
        case 'PUT':
            res.status(200).json(await Db.getTable("sites").update(siteId, req.body));
            break;        
        case 'DELETE':
            res.status(200).json(await Db.getTable("sites").delete(siteId));
            break;
        default:
            res.status(404);
            break;
    }

    res.end();
}
