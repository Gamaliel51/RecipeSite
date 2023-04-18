/* eslint-disable @next/next/no-html-link-for-pages */
import { useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import axios from "axios"

export function return_url(context: { req: { rawHeaders: any[]; }; }) {
  if (process.env.NODE_ENV === "production") {
    // if you are hosting a http website use http instead of https
    return `https://${context.req.rawHeaders[1]}`;
  } else{
    return "http://localhost:3000";
  }
}

export async function getServerSideProps(context: any) {
  const res = await fetch(`${return_url(context)}/api/ingredients`)
  const data = await res.json()

  if(data.status === 'ok'){
    return { props: { ing: data.ing } }
  }
}


export default function AddDish(props: any){
  
    const ingredients: string[] = props.ing

    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [locality, setLocality] = useState('')
    const [content, setContent] = useState('')
    const [ingList, setList] = useState(ingredients)
    const [curList, setCurList] = useState(ingList)
    const [selectedIng, setSelected] = useState<string[]>([])
    const [sinput, setSinput] = useState('')
    const [additional, setAddditional] = useState('')
    const [checkedNumber, setcheckedNumber] = useState<number>(0)

    const [submitted, setSubmitted] = useState(false)
    const [failed, setFailed] = useState(false)

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


    const handleSubmit = async (e: any) => {
      e.preventDefault()

      const response = await axios.post('/api/addDish'
      , {name: name, link: link, locality: locality, ingredients: selectedIng, content: content, additional: additional})

      const result = response.data
      if(result.status === 'ok'){
        setSubmitted(true)
      }

      if(result.status === 'fail'){
        setFailed(true)
      }

    }

    if(submitted){
      return(
        <div className="h-screen w-full bg-diner">
          <div className="w-1/2 h-3/4 mx-auto relative top-20 text-center bg-slate-800">
            <i className="fa fa-circle-check fa-10x top-1/3 relative text-white"></i>
            <p className="relative top-2/4 text-white text-2xl italic">Added Successfully!</p>
          </div>
        </div>
      )
    }

    if(failed){
      return(
        <div className="h-screen w-full bg-diner">
          <div className="w-1/2 h-3/4 mx-auto relative top-20 text-center bg-slate-800">
            <i className="fa fa-times-circle fa-10x top-1/3 relative text-white"></i>
            <p className="relative top-2/4 text-white text-2xl italic">An Error Occurred. Please Try Again.</p>
          </div>
        </div>
      )
    }

    return(
        <div className="h-auto bg-diner">
            <form action="/api/addDish" method="POST" onSubmit={handleSubmit} className="w-3/4 h-auto mx-auto py-5 bg-slate-800">
              <h1 className="text-white font-bold text-3xl mb-10 text-center italic">ADD NEW DISH</h1>
              <div className="w-3/4 h-auto mx-auto mb-5 flex flex-wrap justify-between">
                <input type="text" placeholder="Enter Dish Name" value={name} onChange={(e) => setName(e.target.value)} className="w-96 h-11 px-2"/>
                <input type="text" placeholder="Enter Link" value={link} onChange={(e) => setLink(e.target.value)} className="w-96 h-11 px-2"/>
              </div>
              <div className="w-3/4 h-auto mx-auto flex justify-between">
                <input type="text" placeholder="Enter Dish Locality" value={locality} onChange={(e) => setLocality(e.target.value)} className="w-full mx-auto h-11 px-2"/>
              </div>
              <div className='text-white h-fit w-3/4 mx-auto my-2 bg-slate-800 overflow-hidden'>
                <div className='p-2 text-xl focus:outline-none font-medium cursor-pointer text-center'>Select Ingredients</div>
                <h4 className="text-lg px-2">Selected: 
                  <span className="text-sm mx-3 italic text-gray-500">{checkedNumber} ingredients selected</span>
                </h4>
                <input type="text" placeholder=' Find Ingredient' value={sinput} onChange={search} className="w-full h-10 my-2 bg-slate-600" />
                <div className="h-40 w-full mb-2 flex flex-row flex-wrap overflow-auto bg-slate-600">
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
                <input type="text" placeholder=" Enter ingredients not found ( Separate by commas )" value={additional} onChange={(e) => setAddditional(e.target.value)} className="w-full h-10 my-2 bg-slate-600"/>
              </div>
              <div className="w-11/12 mx-auto">
                <Editor value={content}
                  onEditorChange={(contentNew) => setContent(contentNew)}/>
              </div>
              <div className="w-2/3 h-16 mx-auto">
                <button type="submit" className="h-full w-full mt-4 rounded-xl font-medium text-2xl hover:scale-105 hover:shadow-2xl duration-500 italic bg-slate-500 text-white">Log editor content</button>
              </div>
            </form>
            <aside className="flex flex-col space-y-2 fixed z-30 right-1 bottom-10">
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
        </div>
    )
}