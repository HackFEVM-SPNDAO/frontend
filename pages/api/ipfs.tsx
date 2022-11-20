import type { NextApiRequest, NextApiResponse } from 'next'

import { Submarine } from "pinata-submarine";

const csvPath = './public/uploads/temp.csv';

// uploads to ipfs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const submarine = new Submarine(process.env.IPFS_SUB_KEY!, "https://ccdao.mypinata.cloud");

    await submarine.uploadFileOrFolder(csvPath)
    .then( (ipfs_res) => {
        console.log(ipfs_res.items[0].cid)
        return res.json(ipfs_res.items[0].cid);
    })
};