import React, { useContext, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
// import { CartContext } from '../context/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../rtk/features/CartSlice';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';


function ProductCard({ product }) {

    const { user } = useSelector(state => state.auth)
    const { cart } = useSelector(state => state.cart)
    // const { cart, setCart } = useContext(CartContext)
    let navigate = useNavigate()
    let { id, title, price, rating, image, description } = product
    let dispatch = useDispatch()

    console.log(user)

    let cart_mutation = useMutation({
        mutationFn: addToCart, onSuccess: () => {
            notifyAddToCart()
        }
    })
    console.log("test_mutation", cart_mutation.data)
    // function handleCart(product) {
    //     if (!user) return navigate("/login")
    //     addToCart(product, user._id)
    // }

    async function addToCart(product, userId) {
        try {
            if (!user) return navigate("/login")
            let res = await axios.post("https://fakestoreapi.com/carts", {
                userId,
                products: [{ productId: product.id, quantity: 1 }]
            })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }


    // const addToCartHandler = (product, quantity = 1) => {
    //     if (!user) return navigate("/login")
    //     dispatch(addToCart({ ...product, quantity }))
    //     notifyAddToCart()
    // }


    const notifyAddToCart = () => {
        toast.success('Product Added To Cart', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }

    return (
        <div className="featured-product border p-3 mb-3 position-relative rounded" >
            <span className="wish-icon" >
                <i className="fa-solid fa-heart" style={{ color: "#bc1a1a" }} role="button" ></i>
            </span>
            <img className='img-fluid product-image mb-3' style={{ width: "100%", height: "300px" }} src={image} alt="product img" />
            <div className="product-content">
                <Link to={`/product/${id}`}>
                    <div className="product-name fw-bold mb-3 text-truncate">{title}</div>
                </Link>
                <hr />
                <div className="price fw-bold">Price: {price} $</div>
                <ReactStars
                    count={5}
                    size={24}
                    value={rating.rate}
                    edit={false}
                    activeColor="#ffd700"
                />
                {/* <div className="input-group mb-4">
                    <span className="input-group-text rounded-0 rounded-start" id="basic-addon1">
                        <i className="fa-solid fa-dollar-sign"></i>
                    </span>
                    <input
                        onChange={(e) => setNewPrice(e.target.value)}
                        type="number" id="price"
                        name="price"
                        className="form-control rounded-0 rounded-end"
                        placeholder="enter new price"
                    />
                </div> */}
                <button className="btn add-to-cart text-dark fw-bold w-100" onClick={() => cart_mutation.mutate(product , user?._id)} style={{ backgroundColor: "rgb(5 72 25 / 52%)" }} ><i className="fa-solid fa-cart-plus me-2"></i>Add to Cart</button>

                {/* <button onClick={() => changePrice(id, newPrice)} className="btn add-to-cart text-dark fw-bold w-100 mb-2" style={{ backgroundColor: "#febd69" }} ><i className="fa-solid fa-dollar-sign me-2"></i>Change Price</button> */}
                {/* <button onClick={() => deleteProduct(id)} className="btn btn-danger add-to-cart text-dark fw-bold w-100" >Delete Product</button> */}
            </div>
        </div>
    )
}

export default ProductCard
