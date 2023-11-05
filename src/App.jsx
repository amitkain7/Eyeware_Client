import React from 'react'

import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Regsiter'
import NotFound from './pages/NotFound'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import { useGlobalContext } from './context/context'
import Checkout from './pages/Checkout'
const App = () => {
  const { storeGlobal } = useGlobalContext()
  const { isLogin } = storeGlobal
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={isLogin ? <Cart /> : <Login />} />
        <Route path='/checkout' element={isLogin && <Checkout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App