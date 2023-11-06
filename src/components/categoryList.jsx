import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const CategoryList = () => {

    

    const [category, setCategory] = useState(null)

    const getData = async () => {
        try {

            const res = await fetch('https://eye-back.vercel.app/api/category')
            const data = await res.json()
            setCategory(data.categories)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <h1 className="text-3xl md:text-4xl  break-words text-center mt-10">
                Categories
            </h1>
            <section
                className="grid  grid-cols-1  md:grid-cols-3    gap-4  py-4 mt-1 mx-5"

            >
                {category && category.map((Item) => (
                    <CategoryProduct key={Item._id} category={Item} />
                ))}
            </section>
        </>
    )
}

export default CategoryList




const CategoryProduct = ({ category }) => {
    const { categoryName, categoryImg } = category
    
    const navigate = useNavigate()

    const handleButtonClick = () => {
        // Navigate to the "products" page and pass the filter value as a query parameter
        navigate(`/products?filter=${categoryName}`);
    };
    return (

        <section
            className=" flex flex-col items-center rounded-xl  bg-black cursor-pointer gap-3 relative   "

        >
            <img 
                
                src={categoryImg}
                alt={categoryName}
                className="rounded-xl h-full w-full object-cover  "
            />
            <div
                className="
               flex  w-full h-full justify-center items-center
               absolute left-0 right-0 bottom-0 top-0 bg-black/[0.3] rounded-xl"
            >
                <h1 className="text-4xl sm:text-8xl lg:text-6xl font-extrabold  text-white   hover:scale-110 transition">
                    <button onClick={handleButtonClick} >{categoryName}</button>
                </h1>
            </div>
        </section>
    )

}
