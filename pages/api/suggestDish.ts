import { connectMongo } from "@/lib/connectMongo";
import { Suggestion } from "@/lib/schemas";
import { NextApiRequest, NextApiResponse } from "next";


export default async function SuggestDish(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){

        try{
            await connectMongo()

            const { dishname, info } = req.body
            
            const newSuggestion = new Suggestion({
                dishname: dishname,
                info: info,
            })

            await newSuggestion.save()

            res.json({status: 'ok'})
        }
        catch{
            res.json({staus: 'fail'})
        }

    }
}