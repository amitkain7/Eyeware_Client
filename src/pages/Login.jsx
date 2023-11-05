import React from 'react'
import { Logo } from '../components/Navbar'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/context'

const Login = () => {

  const navigate = useNavigate()
  const { setIsLogged, setUser } = useGlobalContext()
  const [message, setMessage] = useState({ alert: null, success: null });

  const emailRef = useRef()
  const passRef = useRef()

  const loginForm = async (login) => {

    const res = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })

    const data = await res.json()

    if (data.user) {
      const { user, email, token } = data
      emailRef.current.value = '';
      passRef.current.value = '';

      localStorage.setItem('token' , token )

      setMessage({ ...message, success: 'Login Successfull' })
      setTimeout(() => {
        setMessage({ ...message, success: null })
        setIsLogged(true)
        setUser(user, email)
        navigate('/')
      }, 1000)

    }


    if (data.msg == `no user availble with following email ${emailRef.current.value}`) {
      setMessage({ ...message, alert: 'Wrong Email' })
      setTimeout(() => {
        setMessage({ ...message, alert: null })
      }, 2000)
    }

    if (data.msg == 'worng passowrd') {
      setMessage({ ...message, alert: 'Wrong Password' })
      setTimeout(() => {
        setMessage({ ...message, alert: null })
      }, 2000)
    }


  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const login = {
      email: emailRef.current.value,
      password: passRef.current.value
    }
    loginForm(login)
  }

  return (
    <div className='flex h-screen ' >

      <div className='flex items-center justify-center w-full px-5'>
        <section className='px-10 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg'>
          <Logo />
          <div className='flex flex-col gap-2'>
            <h1 className="text-4xl font-bold mb-3">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-5">
              <label htmlFor="Email">Email</label>
              <input ref={emailRef} type="email" id='Email' name='email' required className='border rounded-md p-1 shadow-sm outline-none' />
              <label htmlFor="Pass">Password</label>
              <input ref={passRef} type="password" id='Pass' name='password' required className='border rounded-md p-1 shadow-sm outline-none' />

              <button type='submit' className='bg-gray-500 py-1 text-white rounded-sm'>Login</button>
            </form>
            <div>
              <span className='text-xl text-green-500'>{message?.success}</span>
              <span className='text-xl text-red-600'>{message?.alert}</span>
            </div>
            <p className="text-gray-600 text-sm">
              if you din't have account? {" "}
              <Link
                to="/register"
                className="underline text-base"
              >
                Register here
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login