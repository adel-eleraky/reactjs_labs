import React from 'react'
import { Navigate, Outlet } from 'react-router'

function ProtectRoute() {

    let user = localStorage.getItem("user") || null

    if(!user) return <Navigate to="/login" replace="true" />

    return (
        <Outlet />
    )
}

export default ProtectRoute
