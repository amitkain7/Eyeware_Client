import React from 'react'
import {AiOutlineGithub , AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai'
const Footer = () => {
  return (
    <div className='py-5 mt-3 bg-amber-50 flex flex-wrap justify-center items-center gap-2 md:gap-10  '>
        <p>Eyesome made with 💜 by Amit</p>
        < p className='flex gap-3'>
            <a className='text-2xl text-gray-800' href="https://github.com/amitkain7"><AiOutlineGithub/></a>
            <a  className='text-2xl text-gray-800'  href="in/amit-kaintura-000b7518b"><AiFillLinkedin/></a>
            <a   className='text-2xl text-gray-800' href="https://twitter.com/Alex13836155?t=Wdce5wqDR4Vj9ppTTTi-RA&s=09"><AiOutlineTwitter/></a>
        </p>
    </div>
  )
}

export default Footer