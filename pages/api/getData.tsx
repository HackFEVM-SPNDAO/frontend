import type { NextApiRequest, NextApiResponse } from 'next'
import { Submarine } from "pinata-submarine";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const submarine = new Submarine(process.env.IPFS_SUB_KEY!, "https://ccdao.mypinata.cloud");

    return new Promise((resolve, reject) => {
        submarine.getSubmarinedContentByCid(req.body.cid)
        .then((data: any) => {
            return res.status(200).json(data);
        })
        .catch((err: any) => {
            return res.status(400).json({ error: err });;
        });
    });
};

    