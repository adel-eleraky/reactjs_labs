import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'
import "@fortawesome/fontawesome-free/css/all.min.css"
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import ProtectRoute from './components/ProtectRoute'
import UnAuthRoute from './components/UnAuthRoute'
import Account from './pages/Account'
import Cart from './pages/Cart'
import UserProvider from './context/UserContext'
import CartProvider from './context/CartContext'
import { Provider } from 'react-redux'
import store from './rtk/Store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

function App() {


  const Home = lazy(() => import('./pages/Home'))
  const Categories = lazy(() => import('./pages/Categories'))
  const Login = lazy(() => import('./pages/Login'))
  const Register = lazy(() => import('./pages/Register'))
  const ProductDetails = lazy(() => import('./pages/ProductDetails'))

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Suspense>  <Home /> </Suspense>} />
                <Route path="/product/:productId" element={<Suspense> <ProductDetails /> </Suspense>} />
                <Route path="categories" element={<Suspense> <Categories /> </Suspense>} />
                <Route element={<UnAuthRoute />}>
                  <Route path="login" element={<Suspense> <Login /> </Suspense>} />
                  <Route path="register" element={<Suspense> <Register /> </Suspense>} />
                </Route>
                <Route element={<ProtectRoute />}>
                  <Route path='account' element={<Account />} />
                  <Route path='cart' element={<Cart />} />
                </Route>
              </Route>
            </Routes>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
