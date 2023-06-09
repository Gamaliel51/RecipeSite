/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import Image from 'next/image'
import { Courgette } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import DishCard from '@/components/DishCard'
import { DishPreview, SearchContextType } from '@/components/types'
import { createContext, useContext, useState } from 'react'
import SelectedIngredients from '@/components/SelectedIngredients'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SearchContext } from './_app'
import { SearchBox } from '@/components/SearchBox'

const courgette = Courgette({
  weight: ["400", "400"],
  subsets: ["latin"],
  variable: "--font-courgette"
})

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


export default function Home(props: any) {

  const router = useRouter()

  const dishes: DishPreview[] = props.data
  const ingredients: string[] = props.ing

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

  const redirectAbout = (e: any) => {
    e.preventDefault()
    router.push('/about')
    return
  }

  const handleSearchPopUp = (e: any) => {
    e.preventDefault()
    setDisp(true)
    return
  }

  return (
    <>
      <Head>
        <title>RecipeKing</title>
        <meta name="description" content="Discover New Dishes From All Over The World" />
        <meta name="keywords" content="recipe, kings, recipe kings, recipekings, us, recipe, king, recipeking, recipes, all cultures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/crown.png" />
      </Head>
      <main className='h-auto w-auto bg-white'>
        <SearchBox showSearch={searchPopupDisp} setShow={setDisp} ing={ingredients}/>
        <section className="h-96 flex flex-col bg-diner bg-fixed relative z-20">
          <div className='w-full h-full  bg-gradient-to-tr from-black to-blue-400 opacity-70 absolute z-20'></div>
          <nav className='flex flex-row flex-wrap w-full h-20 z-30'>
            <div className='h-full w-1/2 flex flex-row items-center'>
              <i className='fa fa-crown text-orange-300 text-5xl lg:text-7xl md:text-6xl sm:text-5xl'></i>
              <h2 className='font-semibold text-white lg:text-5xl md:text-3xl sm:text-3xl italic ml-3'>RecipeKing </h2>
            </div>
            <div className='h-full w-1/2 flex flex-row-reverse pr-10'>
              <button onClick={redirectAbout} className='text-white sm:text-xl lg:h-1/2 md:h-8 sm:h-fit w-fit my-auto px-2 lg:px-3 md:px-2 sm:px-2 rounded-2xl outline outline-blue-200 hover:bg-slate-700 hover:shadow-2xl'>About Us</button>
            </div>
          </nav>
          <div className='w-fit flex flex-row lg:min-w-1/2 my-10 self-center items-center h-60 z-30'>
            <i className='fa fa-globe text-white text-9xl px-10'></i>
            <section className=''>
              <p className={`${courgette.className} text-white lg:text-5xl md:text-3xl sm:text-2xl`}>Discover New Dishes</p>
              <p className={`${courgette.className} text-white lg:text-5xl md:text-3xl sm:text-2xl lg:px-10 mt-5`}>From Different Cultures</p>
              <p className={`${courgette.className} text-white lg:text-5xl md:text-3xl sm:text-2xl lg:px-20 mt-5`}>All over the world</p>
            </section>
          </div>
        </section>
        <section className='h-full w-full flex flex-row'>
          <aside>
            <details className='text-white h-fit w-1/5 px-5 mx-auto shadow-2xl rounded-xl bg-slate-800 fixed left-5 bottom-0 z-30 hidden lg:inline-block md:hidden sm:hidden overflow-hidden'>
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
                <button className="h-10 w-full mt-4 rounded-xl font-medium text-xl hover:scale-105 hover:shadow-2xl duration-500 italic bg-slate-500 text-white" type='submit'>Find Dish</button>
              </form>
            </details>
          </aside>
          <section className='h-full w-full lg:w-11/12 grid gap-10 grid-cols-fluid py-10 px-5 mx-auto'>
            {dishes.map((item, key) => {
              return (<DishCard key={key} id={item.dishId} picture={item.dishpicture} dishname={item.dishname} locality={item.locality} ingredients={item.ingredients}/>)
            })}
          </section>
        </section>
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
