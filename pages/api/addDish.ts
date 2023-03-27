import { connectMongo } from "@/lib/connectMongo";
import { Preview, Dish } from "@/lib/schemas";
import { NextApiRequest, NextApiResponse } from "next";

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};


export default async function Add(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        await connectMongo()
        const { name, link, content } = req.body
        const id = uniqueId()
        
        const newPrev = new Preview({
            dishId: id,
            dishname: name,
            ingredients: ['onion', 'salt', 'pepper'],
            dishpicture: link,
            locality: 'West Africa'
        })

        const newDish = new Dish({
            dishId: id,
            procedure: content
        })

        await newPrev.save()
        await newDish.save()
        res.end()
    }
}