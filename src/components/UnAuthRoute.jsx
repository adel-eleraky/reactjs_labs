import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { UserContext } from '../context/UserContext'

function UnAuthRoute() {
    let {user} = useContext(UserContext)

    if (user) return <Navigate to="/account" replace="true" />

    return (
        <Outlet />
    )
}

export default UnAuthRoute
