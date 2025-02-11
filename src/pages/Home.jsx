import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { HashLoader } from 'react-spinners'
import axios from 'axios'
import { renderProducts } from '../utils/Products'

function Home() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    console.log(products)
    async function fetchProducts() {
        try {
            let res = await axios.get('https://fakestoreapi.com/products')

            const data = res.data
            return data
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchProducts().then(res => {
            setProducts(res)
            setLoading(false)
        })
    }, [])


    let productsElements = products && renderProducts(products);


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
                </div> :
                <div className='home-page py-4'>
                    <div className="container">
                        <div className="row">
                            {productsElements}
                        </div>
                    </div>
                </div>}
        </>

    )
}

export default Home
