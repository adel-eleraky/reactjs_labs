import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify';
import { getLoggedInUser } from '../rtk/features/AuthSlice';
import { useDispatch } from 'react-redux';

function Layout() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoggedInUser())
    }, [])

    return (
        <>
            <NavBar />
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default Layout
