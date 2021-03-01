import React from "react";
import { CartContextProvider } from '../Context/CartContext';
import CartContainer from '../Components/CartContainer'

function Cart(props)
{
    return (
    <CartContextProvider>
        <main>
            <CartContainer />
        </main>        
    </CartContextProvider>)
}

export default Cart;