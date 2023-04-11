import { useRef, useState } from "react"
import { Editor } from "@tinymce/tinymce-react"
import axios from "axios"


export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/ingredients`)
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

    const [ingr, setIngr] = useState('')

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

    }

    return(
        <div className="h-auto bg-diner">
            <form action="http://localhost:3000/api/addDish" method="POST" onSubmit={handleSubmit} className="w-3/4 h-auto mx-auto py-5 bg-slate-800">
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
                <input type="text" placeholder=" Enter ingredients not found" value={additional} onChange={(e) => setAddditional(e.target.value)} className="w-full h-10 my-2 bg-slate-600"/>
              </div>
              <div className="w-11/12 mx-auto">
                <Editor value={content}
                  onEditorChange={(contentNew) => setContent(contentNew)}/>
              </div>
              <div className="w-2/3 h-16 mx-auto">
                <button type="submit" className="h-full w-full mt-4 rounded-xl font-medium text-2xl hover:scale-105 hover:shadow-2xl duration-500 italic bg-slate-500 text-white">Log editor content</button>
              </div>
            </form>
        </div>
    )
}