import { DishPreview } from "@/components/types";
import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from '../../lib/connectMongo';
import { Ingredient, Preview } from '../../lib/schemas'


export default async function HomeDishes(req: NextApiRequest, res: NextApiResponse){

    await connectMongo()
    const ingredients = await Ingredient.findOne()
    if(ingredients){
        return res.json({status: 'ok', ing: ingredients.ingredients})
    }

    res.json({status: 'fail'})

}