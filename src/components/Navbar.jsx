import React, { useState } from 'react'
import defaultUser from '../assets/defaultUser.png'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { HiOutlineLogin } from 'react-icons/hi'
import {RxHamburgerMenu} from 'react-icons/rx'
import { useGlobalContext } from '../context/context'
const Navbar = () => {
    const { storeGlobal} = useGlobalContext()
    const amount = storeGlobal.amount
    const navigate = useNavigate()
    const [isOpenMenu ,setIsOpenMenu] = useState(false)
    return (
        <nav className='flex flex-col sticky sm:flex-row py-3 mb-3  left-0 right-0 top-0 px-[4%] md:px-[10%] bg-[--theme-color] shadow z-10'>
            <div className='flex justify-between w-full items-center '>
                <section className='relative flex items-center'>

                    <Link to='/profile'>
                        <img className='rounded-full border-2 bg-yellow-200  hover:bg-yellow-500 cursor:pointer ' src={defaultUser} alt="user" width={40} />
                    </Link>
                    <Logo />
                </section>
                <section className='flex items-center'>
                    <Link to='/products'
                        className='mx-2 px-3 py-1 shadow-sm rounded-md text-white bg-yellow-700 text-sm cursor-pointer hover:bg-yellow-800 '
                    >
                        <span className=''>Explore</span>

                    </Link>
                </section>

                <ul className='hidden md:flex justify-between text-2xl  '>
                    <li className='relative bg-gray-400 p-2 rounded-full cursor-pointer hover:bg-yellow-800' onClick={() => navigate('/login')}>
                        <HiOutlineLogin />
                    </li>
                    <li className='relative bg-yellow-500 p-2 text-white rounded-full hover:bg-yellow-800 cursor-pointer mx-2  ' onClick={() => navigate('/cart')}>
                        <HiOutlineShoppingBag />
                     { amount > 0 ? <p className='absolute bg-red-500 text-white w-5 h-5 flex justify-center items-center left-7 bottom-6 rounded-full text-xs '>{amount}</p> : <span></span>}
                    </li>
                </ul>
                
                <section className='md:hidden cursor-pointer relative'>
                <RxHamburgerMenu className='text-lg'
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                />
                {isOpenMenu && <DropDown navigate={navigate}/>}
                </section>
            </div>

        </nav>
    )
}

export default Navbar





export const Logo = () => {
    return (
        <Link to='/'>
            <div className=' font-monoton text-3xl hover:text-red-800 cursor-pointer text-center transition mx-3 '>
                eyesome
            </div>
        </Link>
    )
}

const DropDown = ({ navigate }) => {
    return (
        <div className='absolute right-0 z-10 bg-yellow-400 font-semibold rounded-lg w-max shadow overflow-hidden transition-all  '>
            <ul className='text-sm'>
                <li onClick={() => navigate('/login')}>
                    <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                        <HiOutlineLogin className="text-lg me-3" /> Login
                    </span>
                </li>
                <li onClick={() => navigate("/cart")}>
                    <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
                        <HiOutlineShoppingBag className="text-lg me-3" /> Bag
                    </span>
                </li>
            </ul>
        </div>
    )
}