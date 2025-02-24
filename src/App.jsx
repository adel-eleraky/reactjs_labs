import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Categories from './pages/Categories'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectRoute from './components/ProtectRoute'
import UnAuthRoute from './components/UnAuthRoute'
import Account from './pages/Account'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import UserProvider from './context/UserContext'
import CartProvider from './context/CartContext'
import { Provider } from 'react-redux'
import store from './rtk/Store'


function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="categories" element={<Categories />} />
              <Route element={<UnAuthRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              <Route element={<ProtectRoute />}>
                <Route path='account' element={<Account />} />
                <Route path='cart' element={<Cart />} />
              </Route>
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
