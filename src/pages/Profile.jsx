import React from 'react'
import { Logo } from '../components/Navbar'
import { useGlobalContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { setIsLogged, setUser, storeGlobal, resetAmount,removeCart ,setTotal } = useGlobalContext()
  const { isLogin } = storeGlobal
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.clear()
    setIsLogged(false)
    setUser(null, null)
    resetAmount()
    removeCart()
    setTotal()
    navigate('/')
  }

  return (
    <main className='flex justify-center items-center '>
      <section className='w-full max-w-md py-8 shadow-md flex flex-col items-center gap-4 rounded-md mt-20 '>
        <Logo />
        <p className='text-3xl md:text-2xl font-semibold text-gray-600 '>Profile</p>
        <div className='my-2'>
          <p className='text-gray-400 text-xl mb-2 '>
            Username: <span className='text-gray-800'>{storeGlobal?.username}</span>
          </p>
          <p className='text-gray-400 text-xl mb-2 '>
            Email: <span className='text-gray-800' >{storeGlobal?.email}</span>
          </p>
        </div>
        {isLogin && <button onClick={handleClick} className='bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-600'>Logout</button>}
      </section>
    </main>
  )
}

export default Profile
