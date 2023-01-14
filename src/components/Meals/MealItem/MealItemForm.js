import { useRef } from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = props => {
    const amountRef = useRef()
    const submitHandler = event => {
        event.preventDefault()
        const enteredAmount = amountRef.current.value

        if (enteredAmount.trim().length === 0 || +enteredAmount < 1 || +enteredAmount > 5) return
        props.onAddToCart(+enteredAmount)
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountRef} label="Amount" input={{id: 'amount', type: 'number', min: '1', max: '5', step: '1', defaultValue: '1'}}></Input>
            <button>+ Add</button>
        </form>
    )
}

export default MealItemForm