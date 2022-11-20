import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore 
import { IncomingForm } from 'formidable-serverless';
var fs = require('fs');

const csvPath = './public/uploads/';

export const config = {
    api: {
        bodyParser: false,
    },
};

const saveFile = async (file: File, id: string) => {
    // @ts-ignore 
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/uploads/${id}.csv`, data);
    // @ts-ignore 
    await fs.unlinkSync(file.path)
    return csvPath;    
};


// uploads to ipfs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = new IncomingForm();
    
    await form.parse(req, (err: any, fields: any, files: any) => {
        saveFile(files.file, fields.id)
        .then(() => {
            return res.status(200).json({success: 'true'});;
        })      
    })    
};
    