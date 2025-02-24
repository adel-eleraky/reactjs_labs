import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify';
import { getLoggedInUser } from '../rtk/features/AuthSlice';
import { useDispatch } from 'react-redux';

function Layout() {

    const dispatch = useDispatch()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        // dispatch(f())
        dispatch(getLoggedInUser()).then(() => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            // <div className='vh-100 d-flex justify-content-center align-items-center'>
            //     <RotateSpinner size={100} color="#55c57a" loading={loading} />
            // </div>
            <div>loading</div>
        )
    }

    return (
        <>
            <NavBar />
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default Layout
