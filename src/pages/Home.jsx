import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { HashLoader } from 'react-spinners'
import axios from 'axios'
import { renderProducts } from '../utils/Products'
import Pagination from '@mui/material/Pagination';
import useWindowSize from '../hooks/WindowSize'

function Home() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [page , setPage] = useState(1)
    const windowSize =  useWindowSize()

    console.log(windowSize)
    async function fetchProducts() {
        try {
            let res = await axios.get('https://fakestoreapi.com/products')

            const data = res.data
            return data
        } catch (err) {
            console.log(err.message)
        }
    }

    function handleChange(e, selectedPage ) {
        setPage(selectedPage)
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
                            {productsElements.slice((page - 1) * 5 , (5 * page))}
                        </div>
                    </div>
                    <div className="row">
                        <Pagination page={page} onChange={handleChange}  count={products.length / 5 } color="secondary" className='m-auto mt-3' style={{ width: "fit-content"}} />
                    </div>
                </div>}
        </>

    )
}

export default Home
