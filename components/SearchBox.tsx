import { useRouter } from "next/router"
import { DishPreview } from "./types"
import { useContext, useState } from "react"
import { SearchContext } from "@/pages/_app"
import axios from "axios"
import SelectedIngredients from "./SelectedIngredients"
import Popup from "reactjs-popup"

interface Props{
    showSearch: boolean,
    setShow: (a: boolean) => void,
    ing: string[]
}


export const SearchBox = (props: Props) => {

    const { showSearch, setShow} = props

    const router = useRouter()
    const ingredients: string[] = props.ing

    const [ingList, setList] = useState(ingredients)
    const [curList, setCurList] = useState(ingList)
    const [selectedIng, setSelected] = useState<string[]>([])
    const [sinput, setSinput] = useState('')
    const [checkedNumber, setcheckedNumber] = useState<number>(0)

    const { searchData, setSearchData} = useContext(SearchContext)

    const search = (e: any) => {
        setSinput(e.target.value)
        if(e.target.value !== ''){
            let temp = []
            temp = ingList.filter((item) => item.includes(e.target.value))
            setCurList(temp)
            return
        }
        setCurList(ingList)
        return
    }

    const handleCheck = (e: any) => {
        if(e.target.checked) {
            setcheckedNumber(checkedNumber + 1)
            let temp  = selectedIng
            temp.push(e.target.id)
            setSelected(temp)
        }
        else{
            if(checkedNumber > 0) {
            setcheckedNumber(checkedNumber - 1)
            let temp = selectedIng.filter((item) => item !== e.target.id)
            setSelected(temp)
            }
        }
    }

    const renderSelected = (itemList: string[]) => {
        let Ingredients = []
        for (let i = 0; i < itemList.length; i++) {
            Ingredients.push(
            <SelectedIngredients key={i} name={itemList[i]} s={selectedIng} setS={setSelected} cn={checkedNumber} setCN={setcheckedNumber}/>
            )
        }
        return Ingredients
    }

    const handleSearchSubmit = async (e: any) => {
        e.preventDefault()

        const response = await axios.post('/api/searchDish', {selected: selectedIng})

        const result = response.data

        if(result.status === 'ok'){
            setSearchData(result.data)
            setShow(false)
            router.push('/search')
        }

    }

    return(
        <Popup open={showSearch} closeOnDocumentClick={false} contentStyle={{height: '100%', width: '100%', display: 'flex'}} repositionOnResize={true}>
            <div className="text-white h-11/12 w-72 px-5 my-auto mx-auto shadow-2xl rounded-xl bg-slate-800 z-30 lg:hidden overflow-auto self-center">
                <h4 className='p-4 focus:outline-none font-medium text-center'>Search by Ingredients <i className="fa fa-close relative left-10" onClick={() => setShow(false)}></i></h4>
                <input type="text" placeholder=' Find Ingredient' value={sinput} onChange={search} className="w-full h-10 my-2 bg-slate-600" />
                <div className="h-80 w-full mb-2 bg-slate-600 overflow-auto">
                {curList.map((item ,key) => {
                    if(selectedIng.includes(item)){
                    return(
                    <div className="mx-1" key={key}>
                        <label htmlFor={item}>
                        <input className="mx-1 accent-slate-900" type={'checkbox'} checked name={item} id={item} onClick={handleCheck}/>{item}
                        </label>
                    </div>)
                    }
                    return(
                    <div className="mx-1" key={key}>
                    <label htmlFor={item}>
                        <input className="mx-1 accent-slate-900" type={'checkbox'} name={item} id={item} onClick={handleCheck}/>{item}
                    </label>
                    </div>)
                })}
                </div>
                <h4 className="text-lg px-2">Selected: 
                <span className="text-sm mx-3 italic text-gray-500">{checkedNumber} ingredients selected</span>
                </h4>
                <form className="h-44 w-full flex flex-col" onSubmit={handleSearchSubmit}>
                <div className="w-full h-28 flex flex-row flex-wrap bg-slate-600 overflow-auto">
                    {renderSelected(selectedIng)}
                </div>
                <button className="h-10 w-full mt-4 rounded-xl font-medium text-xl hover:scale-105 hover:shadow-2xl duration-500 italic bg-slate-500 text-white" type='submit'>Find Dish</button>
                </form>
            </div>
            <div className="w-full h-full bg-slate-700 absolute opacity-70"></div>
        </Popup>
    )
}