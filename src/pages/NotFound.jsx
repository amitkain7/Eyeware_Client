import React from 'react'
import errorImage from '../assets/404-error.gif'
import Navbar from '../components/Navbar'
const NotFound = () => {
    return (
        <>
            <Navbar />
            <div className='h-[60vh] w-full flex flex-col items-center justify-center mt-20 '>
                <img src={errorImage} alt='not-found' className='w-full sm:w-1/2' />
                <span className='mt-3 text-2xl md:text-4xl font-bold text-gray-300 uppercase   '>Nothing Here</span>
            </div>
        </>
    )
}

export default NotFound