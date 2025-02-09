import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import Search from '../components/Search'
import image1 from "./../assets/img/product_1.png"
import image2 from "./../assets/img/product_2.png"
import image3 from "./../assets/img/product_3.png"
import image4 from "./../assets/img/product_4.png"
import image5 from "./../assets/img/product_5.png"

function Home() {

    let [products, setProducts] = useState([
        { id: 1, title: "Generic Motorcycle", price: 100, rating: 4, img: image1 },
        { id: 2, title: "Kawasaki Z800", price: 80, rating: 1, img: image2 },
        { id: 3, title: "MotoGP CI.H1", price: 250, rating: 5, img: image3 },
        { id: 4, title: "Annibale Colombo Sofa", price: 10, rating: 3, img: image4 },
        { id: 5, title: "Knoll Saarinen Executive ", price: 1780, rating: 4, img: image5 },
    ])

    let [searchProducts, setSearchProducts] = useState([])
    let [searchStatus, setSearchStatus] = useState("not-started")

    function changePrice(id, price) {

        searchProducts.length != 0 && setSearchProducts(prev => {
            return prev.map(product => {
                if (+id === product.id) {
                    product.price = +price
                    return product
                }
                return product
            })
        })
        setProducts(prev => {
            return prev.map(product => {
                if (+id === product.id) {
                    product.price = +price
                    return product
                }
                return product
            })
        })
    }

    function deleteProduct(id) {

        searchProducts.length != 0 && setSearchProducts(prev => {
            return prev.filter(product => product.id != +id)
        })
        setProducts(prev => {
            return prev.filter(product => product.id != +id)
        })
    }

    function handleSearch(title) {

        if (title) {
            setSearchStatus("started")
            let product = products.filter(product => {
                if (product.title.startsWith(title)) return product
            })
            setSearchProducts(product)
        } else {
            setSearchStatus("not-started")
            setSearchProducts([])
        }
    }


    function renderProducts(products) {
        return products.map(product => {
            return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                    <ProductCard
                        product={product}
                        changePrice={changePrice}
                        deleteProduct={deleteProduct}
                    />
                </div>
            )
        })
    }

    let productsElements;
    if (searchStatus == "not-started") {
        productsElements = products && renderProducts(products)
    } else {
        productsElements = searchProducts && renderProducts(searchProducts)
    }

    return (

        <div className='home-page py-4'>
            <div className="container">
                <div className="row py-3">
                    <Search handleSearch={handleSearch} />
                </div>
                <div className="row">
                    { searchStatus == "started" ?
                        searchProducts.length == 0 ?
                            <div className='fw-bold text-center fs-3'>No Products found</div> : productsElements
                    : productsElements}
                </div>
            </div>
        </div>
    )
}

export default Home
