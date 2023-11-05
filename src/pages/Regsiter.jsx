import React from 'react'
import { Logo } from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'


const Register = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState({ alert: null, success: null });
    const user = useRef()
    const email = useRef()
    const password = useRef()

    const Registerform = async (register) => {

        try {
            const res = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register)

            })
            const data = await res.json()

            if (data.msg === 'A duplicate value was entered for the following field: email. Please choose another value.') {
                setMessage({ ...message, alert: 'Please enter another email' });
                setTimeout(() => {
                    setMessage({ ...message, alert: null });
                }, 2000);
            }

            if (data.msg === 'successful') {
                user.current.value = '';
                email.current.value = '';
                password.current.value = '';
                setMessage({ ...message, success: 'Registration successful' });
                setTimeout(() => {
                    setMessage({ ...message, success: null });
                    navigate('/login')
                }, 1000);


            }

        }
        catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const register = {
            username: user.current.value,
            email: email.current.value,
            password: password.current.value
        }

        Registerform(register)

    }
    return (
        <div className='flex h-screen ' >

            <div className='flex items-center justify-center w-full px-5'>
                <section className='px-10 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg'>
                    <Logo />
                    <div className='flex flex-col gap-2'>
                        <h1 className="text-4xl font-bold mb-3">Register</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-5">
                            <label htmlFor="Name">Name</label>
                            <input ref={user} type="text" name='username' id='Name' required className='border rounded-md p-1 shadow-sm outline-none' />
                            <label htmlFor="Email">Email</label>
                            <input ref={email} type="email" name='email' id='Email' required className='border rounded-md p-1 shadow-sm outline-none' />
                            <label htmlFor="pass">Password</label>
                            <input ref={password} type="password" name='password' id='pass' required className='border rounded-md p-1 shadow-sm outline-none' />

                            <button type='submit' className='bg-gray-500 py-1 text-white rounded-sm'>Register</button>
                        </form>
                        <div>
                            <span className='text-xl text-green-500'>{message?.success}</span>
                            <span className='text-xl text-red-600'>{message?.alert}</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            if you already have account? {" "}
                            <Link
                                to="/login"
                                className="underline text-base"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Register