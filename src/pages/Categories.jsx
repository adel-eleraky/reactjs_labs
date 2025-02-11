import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import { renderProducts } from '../utils/Products'

function Categories() {

    const [categories, setCategories] = useState([])
    const [categoryProducts , setCategoryProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [category , setCategory] = useState("jewelery")

    async function fetchCategories() {
        try {
            let res = await axios.get("https://fakestoreapi.com/products/categories")

            return res.data
        } catch (err) {
            console.log(err.message)
        }
    }


    function renderCategories(categories) {
        return categories.map(category => {
            return (
                <div className="col-12 col-sm-2 col-md-4 col-lg-3">
                    <button className="btn text-white" style={{ backgroundColor: "rgb(5 72 25 / 52%)"}} onClick={() => setCategory(`${category}`)}>{category}</button>
                </div>
            )
        })
    }


    async function fetchProductsByCategory(category) {
        try {
            let res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)

            return res.data
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchCategories().then(data => {
            setCategories(data)
        })
    }, [])


    useEffect(() => {
        fetchProductsByCategory(category).then(data => {
            setCategoryProducts(data)
            setLoading(false)
        })
    }, [category])

    console.log(categoryProducts)
    
    let categoriesElements = categories && renderCategories(categories)
    let products = categoryProducts && renderProducts(categoryProducts)

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
                <div className='categories-page py-4'>
                    <div className="container">
                        <div className="row text-center">
                            {categoriesElements}
                        </div>
                        <div className="row py-3">
                            {products}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Categories
