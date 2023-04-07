import { NextPage } from 'next'

interface Props{
    name: string,
    s: string[],
    setS: (a: string[]) => void,
}


const SelectedIngredients: NextPage<Props> = (props) => {

    const { name, s, setS } = props

    const handleClick = (e: any) => {
        e.preventDefault()
        let temp = []
        temp = s.filter((item) => item !== name)
        setS(temp)
        let elem = document.getElementById(name)
        elem!.checked = false
    }

    return(
        <div className="bg-white w-fit h-fit mx-2 my-2 px-2 rounded-md shadow-2xl cursor-pointer hover:scale-105 duration-500" onClick={handleClick}>
            <p className="text-slate-800">{name}<i style={{marginLeft: '10px', fontSize: '10px'}} className='fa fa-x'></i></p>
        </div>
    )
}

export default SelectedIngredients