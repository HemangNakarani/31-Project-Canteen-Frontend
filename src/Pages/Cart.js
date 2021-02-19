import React from "react";
import { AppProvider } from '../Context/CartContext';
import TempApp from '../Components/TempApp';
import '../Components/cartindex.css';

function Cart(props)
{

    return <AppProvider>
        <TempApp />
    </AppProvider>
}

export default Cart;