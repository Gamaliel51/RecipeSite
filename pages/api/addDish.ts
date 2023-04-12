import { connectMongo } from "@/lib/connectMongo";
import { Preview, Dish, ingAddRequest } from "@/lib/schemas";
import { NextApiRequest, NextApiResponse } from "next";

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};


export default async function Add(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        try{
            await connectMongo()
            const { name, link, locality, content, ingredients, additional } = req.body
            console.log(req.body)
            const id = uniqueId()
            
            const newPrev = new Preview({
                dishId: id,
                dishname: name,
                ingredients: ingredients,
                dishpicture: link,
                locality: locality,
                extra: additional,
            })

            const newDish = new Dish({
                dishId: id,
                procedure: content
            })

            const newAddition = new ingAddRequest({
                dishname: name,
                name: additional,
            })

            await newPrev.save()
            await newDish.save()
            await newAddition.save()
            res.json({status: 'ok'})
        }
        catch(e){
            res.json({status: 'fail'})
        }
    }
}