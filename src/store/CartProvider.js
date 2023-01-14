import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = { items: [], totalAmount: 0 }
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const existingItemIdx = state.items.findIndex(item => item.id === action.item.id)
        if (existingItemIdx < 0) return { items: state.items.concat(action.item), totalAmount: state.totalAmount + action.item.price * action.item.amount }
        const updatedItems = [...state.items]
        updatedItems[existingItemIdx] = { ...state.items[existingItemIdx], amount: state.items[existingItemIdx].amount + action.item.amount }
        return { items: updatedItems, totalAmount: state.totalAmount + action.item.price * action.item.amount }
    } else if (action.type === 'REMOVE') {
        const existingItemIdx = state.items.findIndex(item => item.id === action.id)
        const updatedItems = [...state.items]
        const updatedItem = state.items[existingItemIdx]
        if (existingItemIdx >= 0 && updatedItem.amount > 1) updatedItems[existingItemIdx] = { ...updatedItem, amount: updatedItem.amount - 1 }
        else if (existingItemIdx >= 0) updatedItems.splice(existingItemIdx, 1)
        return { items: updatedItems, totalAmount: state.totalAmount - updatedItem.price }
    }
    return defaultCartState
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCardHandler = item => { dispatchCartAction({ type: 'ADD', item }) }
    const removeItemFromCartHandler = id => { dispatchCartAction({ type: 'REMOVE', id }) }

    const cartContext = { items: cartState.items, totalAmount: cartState.totalAmount, addItem: addItemToCardHandler, removeItem: removeItemFromCartHandler }

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
}

export default CartProvider