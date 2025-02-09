import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";

function ProductCard({ product, changePrice, deleteProduct }) {

    let { id, title, price, rating, img } = product

    let [newPrice, setNewPrice] = useState(0)

    return (
        <div className="featured-product border p-3 mb-3 position-relative rounded" >
            <span className="wish-icon" >
                <i className="fa-solid fa-heart" style={{ color: "#bc1a1a" }} role="button" ></i>
            </span>
            <img className='img-fluid product-image mb-3' src={img} alt="product img" />
            <div className="product-content">
                <div className="product-name fw-bold mb-3 text-truncate">{title}</div>
                <hr />
                <div className="price fw-bold">Price: {price} $</div>
                <ReactStars
                    count={5}
                    size={24}
                    value={rating}
                    edit={false}
                    activeColor="#ffd700"
                />
                <div className="input-group mb-4">
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
                </div>
                <button onClick={() => changePrice(id, newPrice)} className="btn add-to-cart text-dark fw-bold w-100 mb-2" style={{ backgroundColor: "#febd69" }} ><i className="fa-solid fa-dollar-sign me-2"></i>Change Price</button>
                <button onClick={() => deleteProduct(id)} className="btn btn-danger add-to-cart text-dark fw-bold w-100" >Delete Product</button>
            </div>
        </div>
    )
}

export default ProductCard
