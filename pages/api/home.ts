import { DishPreview } from "@/components/types";
import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from '../../lib/connectMongo';
import { Ingredient, Preview } from '../../lib/schemas'


export default async function HomeDishes(req: NextApiRequest, res: NextApiResponse){

    await connectMongo()
    const samples = await Preview.aggregate([{ $sample: { size: 20 } }])
    const ingredients = await Ingredient.findOne()
    if(samples){
        if(ingredients){
            return res.json({status: 'ok', dishlist: samples, ing: ingredients.ingredients})
        }
        return res.json({status: 'ok', dishlist: samples})
    }

    res.json({status: 'fail'})

}