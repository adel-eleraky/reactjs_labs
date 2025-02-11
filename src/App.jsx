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


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route element={<UnAuthRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<ProtectRoute />}>
              <Route path='account' element={<Account />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
