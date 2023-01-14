import { useContext, useEffect, useState } from 'react'

import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

const HeaderCartbutton = props => {
    const [buttonState, setButonState] = useState(false)
    const cartCtx = useContext(CartContext)
    const numberOfItems = cartCtx.items.reduce((sum, item) => sum + item.amount, 0)

    const btnClasses = `${classes.button} ${buttonState ? classes.bump : ''}`

    useEffect(() => {
        if (cartCtx.items.length === 0) return
        setButonState(true)

        const id = setTimeout(() => {
            setButonState(false)
        }, 300);

        return () => { clearTimeout(id) }
    }, [cartCtx.items])

    return (
        <button className={btnClasses} onClick={props.onToggleCart}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartbutton