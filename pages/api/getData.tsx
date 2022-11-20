import type { NextApiRequest, NextApiResponse } from 'next'
import { Submarine } from "pinata-submarine";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const submarine = new Submarine(process.env.IPFS_SUB_KEY!, "https://ccdao.mypinata.cloud");

    const content = await submarine.getSubmarinedContentByCid(req.body.cid)    
    return res.json(content);
        
};