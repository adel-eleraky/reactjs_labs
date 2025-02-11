import React from 'react'
import { Link } from 'react-router'

function NavBar() {

    let user = JSON.parse(localStorage.getItem("user")) || null
    console.log(user)
    return (
        <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "rgb(5 72 25 / 52%) !important" }}>
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
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="account">{ user?.data?.name }</Link>
                            </li>
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
