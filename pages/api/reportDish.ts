import { connectMongo } from "@/lib/connectMongo";
import { Report, Suggestion } from "@/lib/schemas";
import { NextApiRequest, NextApiResponse } from "next";


export default async function SuggestDish(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){

        try{
            await connectMongo()

            const { dishname, problem } = req.body
            
            const newReport = new Report({
                dishname: dishname,
                problem: problem ,
            })

            await newReport.save()

            res.json({status: 'ok'})
        }
        catch{
            res.json({staus: 'fail'})
        }

    }
}