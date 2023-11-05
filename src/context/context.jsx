// create context Api
import React from 'react'
import { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

const Globalcontext = createContext()

// make custome hook
export const useGlobalContext = () => useContext(Globalcontext)

const Appcontext = ({ children }) => {

    const [storeGlobal, setStoreGlobal] = useState({
        itemArray: [],
        cart: [],
        isLogin: false,
        username: null,
        email: null,
        amount: 0,
        total: 0
    })

   
    const getData = async () => {
        try {
            const res = await fetch('https://eye-back.vercel.app/api/product?limit=28')
            const data = await res.json()
            setStoreGlobal((storeGlobal) => {
                return { ...storeGlobal, itemArray: data.products }
            })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getData()

    }, [])

    const setIsLogged = (value) => {
        setStoreGlobal((storeGlobal) => {
            return { ...storeGlobal, isLogin: value }
        })
    }
    const setUser = (user, Email) => {
        setStoreGlobal((storeGlobal) => {
            return { ...storeGlobal, username: user, email: Email }
        })
    }

    const setAmount = () => {
        setStoreGlobal((storeGlobal) => {
            return { ...storeGlobal, amount: storeGlobal.amount + 1 }
        })
    }
    const resetAmount = (val) => {
        setStoreGlobal((storeGlobal) => {
            return { ...storeGlobal, amount: val ? storeGlobal.amount -1 : 0 }
        })
    }
    const setCart = (value) => {
        setStoreGlobal((storeGlobal) => {
            return { ...storeGlobal, cart: [...storeGlobal.cart, value] }
        });
    };

    const removeCart = (Id) => {

        setStoreGlobal((storeGlobal) => {
            const filtervalue = storeGlobal.cart.filter((item) => item._id !== Id)
            return { ...storeGlobal, cart: Id ? [...filtervalue] : [] }

        })
    }

    const setTotal = (val) => {
        setStoreGlobal((storeGlobal) => {
            return { ...storeGlobal, total: val ? val : 0 }
        });
    }

    return (
        <Globalcontext.Provider value={{ storeGlobal, setAmount, setIsLogged, setUser, resetAmount, setCart ,removeCart , setTotal}}>
            {children}
        </Globalcontext.Provider>
    )
}

export default Appcontext
