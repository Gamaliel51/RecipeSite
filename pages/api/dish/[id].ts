import { CompositeDishData, DishPreview } from "@/components/types";
import { connectMongo } from "@/lib/connectMongo";
import { Dish, Preview } from "@/lib/schemas";
import { NextApiRequest, NextApiResponse } from "next";


export default async function DishEx(req: NextApiRequest, res: NextApiResponse){
    await connectMongo()
    const { id } = req.query
    const prevInfo = await Preview.findOne({dishId: id})
    const dishInfo = await Dish.findOne({dishId: id})

    let data: CompositeDishData = {dishId: prevInfo.dishId, dishname: prevInfo.dishname, dishpicture: prevInfo.dishpicture
        , ingredients: prevInfo.ingredients, locality: prevInfo.locality, procedure: ''}

    if(dishInfo){
        data = {dishId: prevInfo.dishId, dishname: prevInfo.dishname, dishpicture: prevInfo.dishpicture
            , ingredients: prevInfo.ingredients, locality: prevInfo.locality, procedure: dishInfo.procedure}
        
        return res.json({status: 'ok', payload: data})
    }

    res.json({status: 'ok', payload: data})
}