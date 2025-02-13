import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { HashLoader } from 'react-spinners'
import ReactStars from "react-rating-stars-component";
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

function ProductDetails() {

    const { productId } = useParams()
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)
    const { cart, setCart } = useContext(CartContext)
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)

    async function fetchProduct(id) {
        try {
            let res = await axios.get(`https://fakestoreapi.com/products/${id}`)
            return res.data
        } catch (err) {
            console.log(err)
        }

    }

    function handleCart(product) {
        if (!user) return navigate("/login")
        addToCart(product, user.data._id).then(data => {
            let newCart
            if (cart.length != 0) {
                newCart = [...cart, data.products[0]]
            } else {
                newCart = data.products
            }
            localStorage.setItem("cart", JSON.stringify(newCart))
            setCart(newCart)
        })
    }

    async function addToCart(product, userId) {
        try {
            let res = await axios.post("https://fakestoreapi.com/carts", {
                userId,
                products: [{ productId: product.id, quantity }]
            })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProduct(productId).then(data => {
            setProduct(data)
            setLoading(false)
        })
    }, [productId])


    return (
        <>
            {loading ?
                <div className='loading-screen position-absolute top-50 start-50 translate-middle'>
                    <HashLoader
                        color={"rgb(5 72 25 / 52%)"}
                        loading={true}
                        cssOverride={true}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
                :
                <div className="product-page py-5">
                    <div className="container bg-white p-4 rounded">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-5 mb-md-0">
                                {/* <ProductSwiper images={images} /> */}
                                <img src={product.image} alt="" className="img-fluid" style={{ height: "400px", width: "100%", padding: "0 50px" }} />
                            </div>
                            <div className="col-12 col-md-6 ">
                                <div className="content">
                                    <h3 className="name border-bottom pb-2">{product.title}</h3>
                                    <h4 className="price my-4">Price: {product.price}$</h4>
                                    {/* <h4 className='discount'>Discount: -{discountPercentage}%</h4> */}
                                    {/* <h4 className='price-after-discount'>Price after Discount: {price * (100 - discountPercentage) / 100}$</h4> */}
                                    <h4 className="rating mb-4">Rating: {product.rating.rate}
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={product.rating.rate}
                                            edit={true}
                                            activeColor="#ffd700"
                                        />
                                    </h4>
                                    <hr />
                                    <div className="product-details">
                                        {/* <h4 className='brand'>Brand: <span className='fw-light'>{brand}</span></h4> */}
                                        <h4 className='category my-4'>Category: <span className='fw-light'>{product.category}</span></h4>
                                        {/* <h4 className='availability'>Availability: <span className='fw-light'>{stock} In-Stock</span></h4> */}
                                        <h4 className='quantity'>Order Quantity: <input className='form-control w-25 mt-2' type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></h4>
                                    </div>
                                    <button onClick={() => handleCart(product)} className="btn add-to-cart text-dark fw-bold me-3" style={{ backgroundColor: "rgb(5 72 25 / 52%)" }} ><i className="fa-solid fa-cart-plus me-2"></i>Add to Cart</button>
                                    {/* <button className="btn add-to-wishlist text-dark fw-bold" onClick={WishlistHandler}>
                                        {wish ? <><i className="fa-solid fa-heart-crack me-2"></i> Remove from wishlist</> : <><i className="fa-solid fa-heart me-2"></i> Add to wishlist</>}
                                    </button> */}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="description py-3">
                            <h3>Description</h3>
                            <p className='px-3'>{product.description}</p>
                        </div>
                        {/* <div class="reviews border-top py-3">
                            <h2>Reviews</h2>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div class="review_form">
                                        <h3>Leave a Review</h3>
                                        <form id="review-form">
                                            <textarea name="comment" id="review-comment" cols="30" rows="10"
                                                placeholder="Write a review..."></textarea>
                                            <div class="rating">
                                                <label for="rating">Rating</label>
                                                <input type="number" id="rating" />
                                            </div>
                                            <button type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div class="cards">
                                        {reviews && reviews.map(review => {
                                            return (
                                                <div class="review_card">
                                                    <div class="user_details">
                                                        <img src={img}
                                                            alt="" className='img-fluid' />
                                                        <h3>{review.reviewerName}</h3>
                                                    </div>
                                                    <div class="rating">
                                                        <ReactStars
                                                            count={5}
                                                            size={24}
                                                            value={review.rating}
                                                            edit={false}
                                                            activeColor="#ffd700"
                                                        />
                                                    </div>
                                                    <div class="comment">
                                                        {review.comment}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div >
            }
        </>
    )
}

export default ProductDetails
