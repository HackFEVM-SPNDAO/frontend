import type { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore 
import { IncomingForm } from 'formidable-serverless';

var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
import { Submarine } from "pinata-submarine";

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
};


// uploads to ipfs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const submarine = new Submarine(process.env.IPFS_SUB_KEY!, "https://ccdao.mypinata.cloud");

    const form = new IncomingForm();
    await form.parse(req, (err: any, fields: any, files: any) => {
        saveFile(files.file)
        .then(() => {
            submarine.uploadFileOrFolder(csvPath)
            .then((result: any) => {res.status(200).json(result);})
        });
    });


};