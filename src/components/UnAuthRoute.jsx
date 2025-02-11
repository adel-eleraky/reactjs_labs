import React from 'react'
import { Navigate, Outlet } from 'react-router'

function UnAuthRoute() {
    let user = localStorage.getItem("user") || null

    if (user) return <Navigate to="/account" replace="true" />

    return (
        <Outlet />
    )
}

export default UnAuthRoute
