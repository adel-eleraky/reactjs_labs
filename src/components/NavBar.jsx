import React, { useContext } from 'react'
import { Link } from 'react-router'
// import { UserContext } from '../context/UserContext'
// import { CartContext } from '../context/CartContext'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../rtk/features/AuthSlice'

function NavBar() {

    let { user } = useSelector(state => state.auth)
    let cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    console.log(user)
    function handleLogout() {
        dispatch(logoutUser())
    }

    return (
        <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "rgb(5 72 25 / 52%)" }}>
            <div className="container-fluid ">
                <Link className="navbar-brand text-white" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" aria-current="page" to="categories">Categories</Link>
                        </li>
                        {user ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="account">{user?.name}</Link>
                                </li>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link text-white" to="cart">
                                        <i className="fa-solid fs-4 fa-cart-plus me-2"></i>
                                        <span className='badge bg-dark position-absolute top-0' style={{ right: "5px"}}> {cart.length}</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" onClick={handleLogout}>Logout</a>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="register">Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
