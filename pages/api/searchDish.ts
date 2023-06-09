import { DishPreview } from "@/components/types";
import { connectMongo } from "@/lib/connectMongo";
import { Preview } from "@/lib/schemas";
import { NextApiRequest, NextApiResponse } from "next";

let checkSubset = (parentArray: DishPreview[], subsetArray: DishPreview[]) => {
    let set = new Set(parentArray);
    return subsetArray.every(x => set.has(x));
}

export default async function Search(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        await connectMongo()
        const  { selected } = req.body

        const allPrev = await Preview.find()

        const results = allPrev.filter((item) => checkSubset(selected, item.ingredients))
        const results2 = allPrev.filter((item) => checkSubset(item.ingredients, selected))

        if(results){
            if(results2){
                const total = [...results, ...results2]
                return res.json({status: 'ok', data: total})
            }
            return res.json({status: 'ok', data: results})
        }

        if(results2){
            return res.json({status: 'ok', data: results2})
        }

        res.json({status: 'ok', data: null})
        
    }
}