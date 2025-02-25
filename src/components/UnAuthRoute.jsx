import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
// import { UserContext } from '../context/UserContext'
import { useSelector } from 'react-redux'

function UnAuthRoute() {
    let {user} = useSelector(state => state.auth)

    console.log(user)
    if (user && user.emailVerified ) return <Navigate to="/account" replace="true" />

    return (
        <Outlet />
    )
}

export default UnAuthRoute
