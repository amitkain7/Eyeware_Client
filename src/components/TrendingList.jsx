import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useGlobalContext } from '../context/context'
const TrendingList = () => {

    const { storeGlobal } = useGlobalContext()

    let TrendingList = storeGlobal.itemArray
    TrendingList = TrendingList.slice(0,7)
    return (
        <div className='grid  grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 mt-10 mx-5'>
            <h1 className="text-3xl md:text-4xl lg:text-5xl   flex items-center ">
                Trending Products
            </h1>
            {TrendingList && TrendingList.map((item) => (
                <ProductCard key={item._id} product={item} />
            ))}

        </div>

    )
}

export default TrendingList


const ProductCard = ({ product }) => {

    return (
        <Link to={`/product/${product._id}`}
            className='flex flex-colpx-4 py-2 rounded-xl  bg-black/[.06] cursor-pointer gap-3'
        >
            <div className="flex justify-between gap-3  ">
                <div>
                    <h1 className="text-xl font-bold">
                        {product.name}
                    </h1>
                </div>
                <div className='flex flex-col items-start'>
                    <div className="flex items-center justify-between">
                        <h1 className=" text-lg   font-bold">
                            ₹{product.price}
                        </h1>
                        <button className=" p-0.5 bg-amber-600 rounded-md ms-2">
                            <AiOutlinePlus className='text-white font-bold text-sm' />
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm text-end">{product.category}</p>
                </div>
            </div>
            <div className='flex justify-center items-center w-full h-full'>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-30 h-40  py-2 object-cover hover:scale-110 transition"
                />
            </div>
        </Link>
    )
}