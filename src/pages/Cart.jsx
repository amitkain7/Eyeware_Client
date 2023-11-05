import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useGlobalContext } from '../context/context'
import cartImage from '../assets/empty-wish.gif'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
const Cart = () => {
  const { storeGlobal, removeCart, resetAmount, setTotal } = useGlobalContext()
  const { cart, total, } = storeGlobal
  const navigate = useNavigate()
  const item = cart.map((item) => {
    return (
      <CartItem key={item._id} product={item} removeCart={removeCart} value={total} resetAmount={resetAmount} setTotal={setTotal} total={total} />
    )
  })


  return (
    <>
      <Navbar />
      {cart.length > 0 ?
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 mx-5 mt-8'>
          <div >
            {item}
          </div>
          <div className='flex flex-col justify-around p-3 shadow rounded-md w-full lg:w-1/2 lg:h-44'>
            <h1 className='text-xl md:font-bold my-2 '>Price Details</h1>
            <h1 className='h-1 bg-black mx-4 '></h1>
            <div >
              <h1 className='text-xl flex justify-between my-3'>Total : <span>₹{total}</span> </h1>
              <button onClick={() => navigate('/checkout')} className=' text-sm px-1 md:text-base md:px-2  py-1 rounded-xl text-white bg-gray-800'>Proceed to Checkout</button>
            </div>
          </div>
        </div>

        :
        (
          <div className='flex flex-col justify-center items-center mt-8 gap-4'>
            <img src={cartImage} alt='empty-cart' />
            <h2 className='text-xl text-gray-300 font-semibold'>Nothing in the cart wirte Now! </h2>
          </div>
        )
      }
    </>
  )
}

export default Cart



const CartItem = ({ product, removeCart, resetAmount, value, setTotal, total }) => {
  const [quantity, setQuantity] = useState(1)
  const { _id, image, name, newPrice } = product

  const handleClick = () => {
    removeCart(_id)
    const newTotal = total - quantity * newPrice
    setTotal(newTotal)
    resetAmount('re')


  }

  const handleQuantity = (val) => {
    if (val == 'inc') {
      setQuantity((quantity) => quantity + 1)
      const newTotal = total + newPrice
      setTotal(newTotal)
    }
    else {
      setQuantity((quantity) => quantity === 1 ? quantity : quantity - 1)
      const newTotal = quantity === 1 ? total : total - newPrice
      setTotal(newTotal)
    }
  }

  return (

    <div className='flex justify-between items-center p-4  shadow rounded-sm mb-3 '>
      <div className='flex-1 flex justify-center bg-gray-300 rounded-md mr-3'>
        <img src={image} alt={name} width={'120px'} />
      </div>
      <div className='flex-2 flex  justify-between items-center h-3/4 '>
        <div className='flex flex-col items-start justify-around h-full'>
          <h1 className=' text-sm md:text-xl font-semibold text-gray-800 '>{name}</h1>
          <div className='flex gap-2 justify-center items-center'>
            <span className='w-4 h-4  bg-gray-400 rounded-sm text-white cursor-pointer' onClick={() => handleQuantity('inc')}>
              <AiOutlinePlus />
            </span>
            Quantity: {quantity}
            <span className='w-4 h-4  bg-gray-400 rounded-sm text-white cursor-pointer' onClick={() => handleQuantity('desc')}>
              <AiOutlineMinus />
            </span>
          </div>
          <button onClick={handleClick} className='text-xs md:text-base border-2 border-black px-2 py-1 rounded-xl mt-2 hover:bg-black hover:text-white'>Remove Item</button>
        </div>
        <h2 className='text-xl text-gray-500'>₹{newPrice}</h2>
      </div>
    </div>


  )
}