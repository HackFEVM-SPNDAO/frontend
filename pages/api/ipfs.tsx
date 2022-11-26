import type { NextApiRequest, NextApiResponse } from 'next'

import { Submarine } from "pinata-submarine";

// uploads to ipfs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const submarine = new Submarine(process.env.IPFS_SUB_KEY!, "https://ccdao.mypinata.cloud");
    const path = JSON.parse(req.body).path;
    
    return new Promise((resolve, reject) => {
        submarine.uploadFileOrFolder(path)
        .then((ipfs_res: any) => {            
            return res.status(200).json(ipfs_res.items[0].cid);
        })
        .catch((err: any) => {
            return res.status(400).json({ error: err });;
        });
    });

};