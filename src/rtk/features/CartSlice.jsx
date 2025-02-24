import { createSlice } from "@reduxjs/toolkit"

const CartSlice = createSlice({
    name: "cart",
    initialState: JSON.parse(localStorage.getItem("cart")) || [],
    reducers: {
        addToCart: (state, action) => {

            const { id, quantity } = action.payload
            let newState

            const existingProduct = state.find(product => product.id === +id)

            if (existingProduct) {
                newState = state.map(product => {
                    return product.id === +id ? { ...product, quantity: product.quantity + quantity } : product
                })
            } else {
                newState = [...state, action.payload]
            }

            localStorage.setItem("cart", JSON.stringify(newState))
            return newState
        },
        removeFromCart: (state, action) => {

            const { id } = action.payload

            let newState = state.filter(product => {
                return product.id !== +id
            })

            localStorage.setItem("cart", JSON.stringify(newState))
            return newState
        },
        changeQuantity: (state, action) => {

            const { id, quantity } = action.payload
            let newState;
            
            if(quantity === 0) {
                newState = state.filter(product => product.id !== +id)
                return newState
            }

            newState = state.map(product => {
                return product.id === +id ? { ...product, quantity } : product
            })

            localStorage.setItem("cart", JSON.stringify(newState))
            return newState
        }
    }
})

export const { addToCart, removeFromCart, changeQuantity } = CartSlice.actions
export default CartSlice.reducer