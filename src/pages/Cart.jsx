import React, { useContext, useEffect, useState } from 'react'
// import { CartContext } from '../context/CartContext'
import axios from 'axios'
import "./css/Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { changeQuantity, removeFromCart } from '../rtk/features/CartSlice'
import { Link } from 'react-router'

function Cart() {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    let cartItems = cart && cart.map(item => {

        let { id, title, image, price, quantity } = item

        return (
            <tr key={id}>
                <td className='d-flex align-items-center py-4'>
                    <i className="fa-regular fa-circle-xmark fs-4" onClick={(() => dispatch(removeFromCart({ id })))}></i>
                    <img alt="" src={image} className="img-fluid product-img d-block mx-3 rounded"
                        style={{ backgroundColor: "#e5e5e5", width: "40px" }} />
                    <a className='text-dark title'>
                        <p className="m-0">{title.substring(0, 20) + "..."} </p>
                    </a>
                </td>
                <td className="price"> {price} </td>
                <td className="qty">
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-success px-3 py-1 rounded" onClick={() => dispatch(changeQuantity({ id, quantity: quantity + 1 }))}>+</button>
                        <input className="p-0 outline-0 mx-1 rounded qty-input" value={quantity} type="number" name="quantity" />
                        <button className="btn btn-danger px-3 py-1 rounded" onClick={() => dispatch(changeQuantity({ id, quantity: quantity - 1 }))}>-</button>
                    </div>
                </td>
                <td className="total-price">{price * quantity} </td>
            </tr>
        )
    })

    const totalPrice = cart && cart.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)

    return (
        <div className="cart-page">
            <div className='container py-3'>
                {cart.length == 0 ?
                    <div className="empty-cart py-3">
                        <h3 className='text-center text-danger fw-bold mb-4'>Your Cart is empty</h3>
                        <Link to="/categories" className='text-dark d-block text-center'>Back to browse Products <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                    </div> :
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
                                    {cartItems}
                                </tbody >
                            </table >
                        </div >
                        <div className="col-12 col-lg-4">
                            <div className='cart-total'>
                                <h3 className='mb-3'>Total Price : {totalPrice} </h3>
                                <div className="coupon-card">
                                    <input className='coupon-input' type='text' name='coupon' placeholder='coupon code' />
                                    <button className="btn coupon-btn text-white">Apply Coupon</button>
                                </div>
                                <button className="btn text-white checkout-btn">Proceed to Check Out</button>
                            </div>
                        </div>
                    </div >
                }
            </div >
        </div>
    )
}

export default Cart
