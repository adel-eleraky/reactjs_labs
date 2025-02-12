import { createContext, useState } from "react";


export const CartContext = createContext()

export default function CartProvider({children}){

    let [cart , setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [] )

    return (
        <CartContext.Provider value={{cart , setCart}}>
            {children}
        </CartContext.Provider>
    )

}