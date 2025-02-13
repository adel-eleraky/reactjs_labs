import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import axios from 'axios'
import "./css/Cart.css"

function Cart() {

    const { cart } = useContext(CartContext)

    let [products, setProducts] = useState([])

    console.log(cart)
    useEffect(() => {
        cart.map(item => {
            fetchProduct(item.productId).then(data => {
                setProducts(prev => {
                    if (prev.some(item => item.id == data.id)) return prev
                    return [...prev, data]
                })
            })
        })
    }, [cart])

    async function fetchProduct(id) {
        try {
            let res = await axios.get(`https://fakestoreapi.com/products/${id}`)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }


    let productsElements = products && renderCartItems(products)

    function renderCartItems(items) {
        let qty = 1
        return items.map(item => {
            qty = cart.find(i => i.productId == item.id).quantity
            return (
                <tr>
                    <td className='d-flex align-items-center py-4'>
                        <i className="fa-regular fa-circle-xmark fs-4" ></i>

                        <img alt="" src={item.image} className="img-fluid product-img d-block mx-3 rounded"
                            style={{ backgroundColor: "#e5e5e5", width: "40px" }} />
                        <a className='text-dark title'>
                            <p className="m-0">{item.title.substring(0, 20) + "..."} </p>
                        </a>
                    </td>
                    <td className="price"> {item.price} </td>
                    <td className="qty">
                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn btn-success px-3 py-1 rounded" >+</button>
                            <input className="p-0 outline-0 mx-1 rounded qty-input" value={qty} type="number" name="quantity" />
                            <button className="btn btn-danger px-3 py-1 rounded" >-</button>
                        </div>
                    </td>
                    <td className="total-price">{item.price * 1} </td>
                </tr>
            )
        })
    }

    return (
        <div className="cart-page">
            <div className='container py-3'>
                <div className="row">
                    <div className='col-12 col-lg-8 table-container'>
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th scope="col" className='w-50'>Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsElements}

                            </tbody >
                        </table >
                    </div >
                    <div className="col-12 col-lg-4">
                        <div className='cart-total'>
                            <h3 className='mb-3'>Total Price : cart.totalPrice </h3>
                            <div className="coupon-card">
                                <input className='coupon-input' type='text' name='coupon' placeholder='coupon code' />
                                <button className="btn coupon-btn text-white">Apply Coupon</button>
                            </div>
                            <button className="btn text-white checkout-btn">Proceed to Check Out</button>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}

export default Cart
