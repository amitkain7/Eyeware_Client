import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { GiRoundStar } from 'react-icons/gi'
import { useGlobalContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

const ProductDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { storeGlobal, setAmount, setCart ,setTotal} = useGlobalContext()
    const { isLogin, cart, total } = storeGlobal
    const products = storeGlobal.itemArray
    const singleGlass = products.find((item) => item._id === id)

    const inCart = cart.find((item) => item._id == id)
    const handleClick = () => {
        if (!isLogin) {
            navigate('/login')
            return
        }
        if (inCart) {
            navigate('/cart')
            return
        }
        setCart(singleGlass)
        const newTotal = total+singleGlass?.newPrice
        setTotal(newTotal)
        setAmount()

    }

    if (singleGlass) {
        return (
            <>
                <Navbar />
                <div className='md:min-h-[80vh] flex justify-center items-center pt-3   mx-5'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-10'>
                        <section className='  bg-gray-300 flex items-center justify-center rounded-lg'>
                            <img src={singleGlass.image} alt={singleGlass.name} className=' max-w-xs' />
                        </section>
                        <section className='flex flex-col gap-2 bg-white/30 mt-6 rounded-lg sm:mt-0 p-4'>
                            <div className='py-1'>
                                <h2 className='text-2xl py-2 font-semibold '>{singleGlass.name}</h2>
                                <p className=' text-gray-600 font-normal py-1 '>{singleGlass.description}</p>
                                <div className='flex items-center gap-2 text-gray-400 '> <GiRoundStar className='text-amber-400 ' /> ({singleGlass.rating}) <span className='text-xs'>Rating</span></div>
                            </div>
                            <div>
                                <h1 className='text-xl pb-2  text-black font-bold '>About product</h1>
                                <div className='flex gap-6 items-center'>

                                    <div className='py-2' >
                                        <p className='text-gray-400 text-xs '>Brand : <span className='text-black text-base'>{singleGlass?.brand}</span></p>
                                        <p className='text-gray-400 text-xs '>Category : <span className='text-black text-base'>{singleGlass?.category}</span></p>
                                    </div>
                                    <div className='py-2'>
                                        <p className='text-gray-400 text-xs '>Gender : <span className='text-black text-base' >{singleGlass?.gender}</span></p>
                                        <p className='text-gray-400 text-xs '>Heavy : <span className='text-black text-base'>{singleGlass?.weight}</span></p>
                                    </div>
                                </div>

                            </div>
                            <div className='mt-1'>
                                <p className='text-xl '>Price : <span className='text-amber-600 '>₹{singleGlass.newPrice}</span> <span className='text-xs line-through'>{singleGlass.price}</span></p>
                            </div>
                            <div className='mb-2 mt-4  flex justify-center '>
                                <button onClick={handleClick} className='border-black border-2 py-2 px-8 rounded-3xl hover:bg-black hover:text-white'>{inCart ? 'Go to Cart' : 'Add to Cart'}</button>
                            </div>
                        </section>
                    </div>

                </div>
            </>

        )
    }
}

export default ProductDetail