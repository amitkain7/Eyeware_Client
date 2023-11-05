import React from 'react'
import { GiRoundStar } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'


const SingleProducts = ({ product }) => {
    const navigate = useNavigate()
    const { _id, image, brand, name, rating, price, newPrice } = product

    return (
        <div className='flex flex-col bg-white/[0.6] rounded-md shadow hover:scale-105 transition-all  cursor-pointer '>
            <div
                className=' flex justify-center align-center p-10 bg-gray-200 w-full '
                onClick={() => navigate(`/product/${_id}`)}
            >
                <img src={image} alt={name} className='w-full object-cover h-30 ' />
            </div>
            <div>
                <div className='flex p-2 justify-between '>
                    <div>
                        <h2 className='text-xl '>{name}</h2>

                        <h3>{rating} <GiRoundStar className='text-yellow-400 inline' /> <span className='text-xs text-gray-400'>Rating</span></h3>
                        <p className='text-gray-700 py-1'>{brand}</p>
                    </div>
                    <div >
                        <p className='text-xl text-orange-600 '>₹{newPrice}</p>
                        <p className='text-gray-500 line-through'>{price}</p>
                    </div>
                </div>
                <hr />
                <div className='flex justify-center'>
                    <button onClick={() => navigate(`/product/${_id}`)} className=' border-black  border-2 rounded-xl py-1 px-4 my-2 hover:bg-black hover:text-white '>Description</button>
                </div>
            </div>
        </div>
    )
}

export default SingleProducts