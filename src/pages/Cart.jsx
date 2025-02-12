import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { renderProducts } from '../utils/Products'
import axios from 'axios'

function Cart() {

    const { cart } = useContext(CartContext)

    let [products, setProducts] = useState()

    useEffect(() => {
        cart.map(item => {
            console.log(item)
            fetchProduct(item.productId).then(data => {
                // products.push(data)
                setProducts(data)
            })
        })

        // console.log(products)
    }, [cart])

    async function fetchProduct(id) {
        try {
            let res = await axios.get(`https://fakestoreapi.com/products/${id}`)
            return res.data
        } catch (err) {
            console.log(err)
        }

    }

    console.log(products)
    let productsElements = products && renderProducts([products])
    return (
        <div className='container py-3'>
            <div className="row">
                {productsElements}
            </div>
        </div>
    )
}

export default Cart
