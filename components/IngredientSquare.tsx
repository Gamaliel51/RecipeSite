import { NextPage } from 'next'
import styles from '../styles/Ingredients.module.css'

interface Props{
    name: string,
    a: string[],
    s: string[],
    setA: (a: string[]) => void,
    setS: (a: string[]) => void,
}


const IngredientSquare: NextPage<Props> = (props) => {

    const { name, a, s, setA, setS } = props

    const handleClick = (e: any) => {
        e.preventDefault()
        let temp = []
        temp = a.filter((item) => item !== name)
        setA(temp)
        temp = s
        temp.push(name)
        setS(temp)
    }

    return(
        <div className={styles.square} onClick={handleClick}>
            <p className={styles.p}>{name}</p>
        </div>
    )
}

export default IngredientSquare