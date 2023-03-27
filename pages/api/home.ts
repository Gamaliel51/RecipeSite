import { DishPreview } from "@/components/types";
import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from '../../lib/connectMongo';
import { Preview } from '../../lib/schemas'


export default async function HomeDishes(req: NextApiRequest, res: NextApiResponse){

    await connectMongo()
    const samples = await Preview.aggregate([{ $sample: { size: 20 } }])
    if(samples){
        return res.json({status: 'ok', dishlist: samples})
    }

    res.json({status: 'fail'})

}