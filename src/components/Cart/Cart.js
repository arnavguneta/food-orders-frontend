import classes from './Cart.module.css'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import CartItem from './CartItem'

const Cart = props => {
    const cartCtx = useContext(CartContext)

    const addItemHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 })
    }

    const removeItemHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItems = cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={removeItemHandler.bind(null, item.id)} onAdd={addItemHandler.bind(null, item)}/>)
    
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    
    return (
        <Modal onToggleCart={props.onToggleCart}>
            <ul className={classes['cart-items']}>{cartItems}</ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onToggleCart}>Close</button>
                {cartCtx.items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart