import { useState } from 'react'

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from './store/CartProvider';

function App() {
    const [showCart, setShowCart] = useState(false)

    const toggleCartHandler = () => {
        setShowCart(prevState => !prevState)
    }

    return (
        <CartProvider>
            {showCart && <Cart onToggleCart={toggleCartHandler}/>}
            <Header onToggleCart={toggleCartHandler}/>
            <main>
                <Meals />
            </main>
        </CartProvider>
    );
}

export default App;
