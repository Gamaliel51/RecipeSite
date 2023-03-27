/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props{
    id?: string,
    picture: string,
    dishname: string,
    locality: string,
    ingredients: string[],
}

const DishCard: NextPage<Props> = (props) => {

    const { id, picture, dishname, locality, ingredients } = props
    let temp = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']

    return(
        <Link href={`/dish/${id}`}>
            <div className="flex flex-col drop-shadow-2xl hover:scale-105 duration-700 cursor-pointer relative">
                <div className="w-full h-96">
                    <img src={picture}
                    alt="Dish picture" className="w-full h-full rounded-lg"/>
                </div>
                <div className="w-full h-1/4 px-4">
                    <h4 className="w-full text-black text-3xl font-fancyhead italic">{dishname}</h4>
                    <h6 className="w-full truncate text-black">Locality: {locality}</h6>
                    <p className="w-full text-black truncate font-extralight text-sm">
                        Ingredients: {ingredients.map((item) => {
                            return `${item}, `
                        })}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default DishCard