import { NextPage } from 'next'
import styles from '../styles/Ingredients.module.css'

interface Props{
    name: string,
    a: string[],
    s: string[],
    setA: (a: string[]) => void,
    setS: (a: string[]) => void,
}


const SelectedIngredients: NextPage<Props> = (props) => {

    const { name, a, s, setA, setS } = props

    const handleClick = (e: any) => {
        e.preventDefault()
        let temp = []
        temp = s.filter((item) => item !== name)
        setS(temp)
        temp = a
        temp.push(name)
        setA(temp)
    }

    return(
        <div className={styles.square} onClick={handleClick}>
            <p className={styles.p}>{name}<i style={{marginLeft: '10px', fontSize: '10px'}} className='fa fa-x'></i></p>
        </div>
    )
}

export default SelectedIngredients