import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { UserContext } from '../context/UserContext'
import { useSelector } from 'react-redux'

function ProtectRoute() {

    let {user} = useSelector(state => state.auth)

    if(!user) return <Navigate to="/login" replace="true" />

    return (
        <Outlet />
    )
}

export default ProtectRoute
