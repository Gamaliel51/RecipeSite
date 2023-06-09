/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import { useRouter } from "next/router";
import { DishPreview } from '../components/types'
import { useContext, useState } from "react";
import DishCard from "@/components/DishCard";
import axios from "axios";
import SelectedIngredients from "@/components/SelectedIngredients";
import { SearchContext } from "./_app";
import { SearchBox } from "@/components/SearchBox";

export async function getServerSideProps({req}: any) {
    let baseUrl = req ? `https://${req.headers.host}` : '';
    if(req.protocol){
        baseUrl = req ? `${req.protocol}://${req.headers.host}` : '';
    }
    const res = await fetch(`${baseUrl}/api/home`)
    const data = await res.json()
  
    if(data.status === 'ok'){
      let temp = data.dishlist
      return { props: { data: temp, ing: data.ing } }
    }
}



export default function SearchPage(props: any){

    const ingredients: string[] = props.ing
    const router = useRouter()

    const [ingList, setList] = useState(ingredients)
    const [curList, setCurList] = useState(ingList)
    const [selectedIng, setSelected] = useState<string[]>([])
    const [sinput, setSinput] = useState('')
    const [searchPopupDisp, setDisp] = useState(false)
    const [checkedNumber, setcheckedNumber] = useState<number>(0)

    const { searchData, setSearchData} = useContext(SearchContext)

    const search = (e: any) => {
        setSinput(e.target.value)
        if(e.target.value !== ''){
            let temp = []
            temp = ingList.filter((item) => item.toLowerCase().includes(e.target.value.toLowerCase()))
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
            router.push('/search')
        }
    }

    if(searchData.length === 0){
        return(
            <>
                <Head>
                    <title>Search</title>
                    <meta name="description" content="Find any dish by ingredients" />
                    <meta name="keywords" content="find, search, recipe, kings, recipe kings, recipekings, us" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/crown.png" />
                </Head>
                <main className="h-screen w-full bg-diner flex">
                    <SearchBox showSearch={searchPopupDisp} setShow={setDisp} ing={ingredients}/>
                    <div className="h-3/4 w-3/4 mx-auto my-auto bg-white flex text-center">
                        <p className="text-slate-800 text-6xl h-1/4 w-full my-auto"><i className="fa fa-exclamation-circle text-black fa-1x"></i> No Results Found</p>
                    </div>
                    <aside>
                        <details className='text-white h-fit w-1/5 px-5 mx-auto shadow-2xl rounded-xl bg-slate-800 fixed left-5 bottom-0 z-30 hidden lg:inline-block md:hidden sm:hidden overflow-hidden' open>
                            <summary className='p-4 focus:outline-none font-medium cursor-pointer text-center'>Search by Ingredients</summary>
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
                                <button className="h-10 w-full mt-4 rounded-xl font-medium text-xl hover:scale-105 hover:shadow-2xl duration-500 italic bg-slate-500 text-white" type="submit">Find Dish</button>
                            </form>
                        </details>
                    </aside>
                    <aside className="flex flex-col space-y-2 fixed z-30 right-1 bottom-10">
                        <div className="w-16 h-16 lg:hidden bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl" onClick={() => setDisp(true)}>
                            <i className="fa fa-search fa-2x"></i>
                        </div>
                        <a href="/">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Home</span>
                        </div>
                        </a>
                        <a href="/suggest">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-handshake-angle fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Suggest</span>
                        </div>
                        </a>
                        <a href="/report">
                        <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                            <i className="fa fa-flag fa-2x"></i>
                            <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Report</span>
                        </div>
                        </a>
                    </aside>
                </main>
            </>
        )
    }

    return(
        <>
            <Head>
                <title>Search</title>
                <meta name="description" content="Find any dish by ingredients" />
                <meta name="keywords" content="find, search, recipe, kings, recipe kings, recipekings, us" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/crown.png" />
            </Head>
            <main className="h-auto min-h-screen w-full bg-diner">
                <SearchBox showSearch={searchPopupDisp} setShow={setDisp} ing={ingredients}/>
                <div className="h-full min-h-screen w-3/4 mx-auto bg-white">
                    <section className='h-full w-full lg:w-11/12 grid gap-10 grid-cols-fluid py-10 px-5 mx-auto'>
                        {searchData.map((item, key) => {
                            return( <DishCard key={key} dishname={item.dishname} ingredients={item.ingredients} 
                                locality={item.locality} picture={item.dishpicture} id={item.dishId}/>)
                        })}
                    </section>
                </div>
                <aside>
                    <details className='text-white h-fit w-1/5 px-5 mx-auto shadow-2xl rounded-xl bg-slate-800 fixed left-5 bottom-0 z-30 hidden lg:inline-block md:hidden sm:hidden overflow-hidden' open>
                        <summary className='p-4 focus:outline-none font-medium cursor-pointer text-center'>Search by Ingredients</summary>
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
                            <button className="h-10 w-full mt-4 rounded-xl font-medium text-xl hover:scale-105 hover:shadow-2xl duration-500 italic bg-slate-500 text-white" type="submit">Find Dish</button>
                        </form>
                    </details>
                </aside>
                <aside className="flex flex-col space-y-2 fixed z-30 right-1 bottom-10">
                    <div className="w-16 h-16 lg:hidden bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl" onClick={() => setDisp(true)}>
                        <i className="fa fa-search fa-2x"></i>
                    </div>
                    <a href="/">
                    <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                        <i className="fa fa-home fa-2x"></i>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Home</span>
                    </div>
                    </a>
                    <a href="/suggest">
                    <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                        <i className="fa fa-handshake-angle fa-2x"></i>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Suggest</span>
                    </div>
                    </a>
                    <a href="/report">
                    <div className="group w-16 h-16 bg-white rounded-full flex justify-center items-center hover:bg-black hover:text-white cursor-pointer shadow-2xl">
                        <i className="fa fa-flag fa-2x"></i>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 p-1 text-sm text-gray-100 rounded-md absolute left-1/2 -top-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">Report</span>
                    </div>
                    </a>
                </aside>
            </main>
        </>
    )
}