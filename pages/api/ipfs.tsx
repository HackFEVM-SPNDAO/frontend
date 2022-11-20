import type { NextApiRequest, NextApiResponse } from 'next'

import { Submarine } from "pinata-submarine";

const csvPath = './public/uploads/temp.csv';

// uploads to ipfs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const submarine = new Submarine(process.env.IPFS_SUB_KEY!, "https://ccdao.mypinata.cloud");

    if (req.method === 'POST') {
        await submarine.uploadFileOrFolder(csvPath)
            .then((ipfs_res) => {
                return res.json(ipfs_res.items[0].cid);
            })
    }
    // else if (req.method === 'GET') {
    //     console.log(req)
    //     await submarine.getSubmarinedContentByCid(req.body.cid)
    //         .then((data) => {
    //             return res.json(data);
    //         })
    // }

};