import React, { useState } from 'react'
import bannerHero from '../assets/bannerHero.jpg'
import Navbar from '../components/Navbar'
import SingleProducts from '../components/SingleProduct'
import { useGlobalContext } from '../context/context'
import { useLocation } from 'react-router-dom'

const ProductList = () => {

    const { storeGlobal } = useGlobalContext()
    const products = storeGlobal.itemArray
    const location = useLocation()
    const [sort, setSort] = useState('sort')
    const queryParams = new URLSearchParams(location.search);
    const filtervalue = queryParams.get('filter');

    // make first word capital
    const value = filtervalue ? filtervalue.charAt(0).toUpperCase() + filtervalue.slice(1) : null

    let filterProducts = value ?
        products.filter((item) => item.category === value) :
        products


    if (sort == 'high') {
        
        filterProducts = filterProducts.sort((a, b) => b.newPrice - a.newPrice);
    }
    if (sort == 'low') {

        filterProducts = filterProducts.sort((a, b) => a.newPrice - b.newPrice);
    }
   
    return (
        <>
            <Navbar />
            <div>
                <header className='mb-3 mx-5'>
                    <img src={bannerHero} alt="herobanner" className='rounded-md h-full min-h-[10rem] object-cover ' />
                </header>
                <section className='flex justify-between mx-5'>
                    <h1 className='text-2xl font-bold'>Glasses fou You!</h1>
                    <div className='flex gap-2'>
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className='cursor-pointer border-black border-2 rounded-lg ' name="sort" id="sort">
                            <option Value='sort'>Sort by Price</option>
                            <option value="high">High to Low</option>
                            <option value="low">Low to High</option>
                        </select>

                    </div>
                </section>

                {filterProducts &&
                    <div className='relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-5 mt-4'>
                        {filterProducts.map((item) => {
                            return (
                                <SingleProducts key={item._id} product={item} />
                            )
                        })}
                    </div>
                }

            </div>
        </>
    )
}

export default ProductList