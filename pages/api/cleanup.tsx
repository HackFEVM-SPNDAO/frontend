import type { NextApiRequest, NextApiResponse } from 'next'
var fs = require('fs');

// uploads to ipfs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {    
    const path = JSON.parse(req.body).path;
    console.log(path);
    return new Promise((resolve, reject) => {
        fs.unlinkSync(path, (err: any)=>{
            if (err) {                
                return res.status(400).json({ success: 'false' });;
            }
            return res.status(200).json({ success: 'true' });;
        })
    });
};

