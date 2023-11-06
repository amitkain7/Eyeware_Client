import React from 'react'
import Navbar from '../components/Navbar'
import { useGlobalContext } from '../context/context'
import { useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Checkout = () => {
  const { storeGlobal, setTotal, resetAmount, removeCart } = useGlobalContext()
  const { total } = storeGlobal
  

  const navigate = useNavigate()
  const initPayment = (data) => {

    const options = {
      key: "rzp_test_ClU8FLSvKyioKw",
      amount: data.amount,
      currency: data.currency,
      name: 'Eyesome ',
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        console.log(response)
        const token = localStorage.getItem('token')
        const res = await fetch('https://eye-back.vercel.app/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify(response)
        })
        const data = await res.json()

        if (data.msg === 'payment verified successfully') {
          setTotal()
          resetAmount()
          removeCart()
          toast.success('🦄 Order Successfull !', {
            theme : 'dark'
          })
          setTimeout(() => {
            navigate('/')
          }, 2000)

        }


      },
      prefill: {
        name: "eyeSome",
        email: "eyesome@gamil.com",
        contact: "9999999999"
      },
      theme: {
        "color": "#121212"
      }
    }

    const razor = new window.Razorpay(options);
    razor.open();
  };


  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('https://eye-back.vercel.app/api/payment/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`

        },
        body: JSON.stringify({ amount: total })
      })
      const data = await res.json()

      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      

        {total > 0 && <div className='flex flex-col justify-between items-center  h-40 shadow m-auto rounded-lg mt-20 w-60 '>
          <h1 className='text-xl bg-blue-800 w-full text-white text-center '>Payment page</h1>
          <h1>Total :  <span>₹ {total}</span></h1>
          <button onClick={handlePayment} className='mb-6 bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-800' >
            confirm payment
          </button>
        </div>

        }
        <ToastContainer/>
     

    </>
  )
}

export default Checkout


