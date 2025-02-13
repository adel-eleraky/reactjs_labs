import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { UserContext } from '../context/UserContext'

function ProtectRoute() {

    let {user} = useContext(UserContext)

    if(!user) return <Navigate to="/login" replace="true" />

    return (
        <Outlet />
    )
}

export default ProtectRoute
