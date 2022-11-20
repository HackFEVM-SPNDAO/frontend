import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore 
import { IncomingForm } from 'formidable-serverless';
var fs = require('fs');

const csvPath = './public/uploads/temp.csv';

export const config = {
    api: {
        bodyParser: false,
    },
};

const saveFile = async (file: File) => {
    // @ts-ignore 
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(csvPath, data);
    // @ts-ignore 
    await fs.unlinkSync(file.path)
    return csvPath;    
};


// uploads to ipfs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = new IncomingForm();
    
    await form.parse(req, (err: any, fields: any, files: any) => {
        saveFile(files.file)
        .then(() => {
            return res.status(200).json({success: 'true'});;
        })      
    })    
};
    