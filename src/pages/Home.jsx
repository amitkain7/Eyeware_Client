import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import TrendingList from '../components/TrendingList'
import CategoryList from '../components/categoryList'
const Home = () => {

  return (

    <>
      <Navbar />
      <Banner />
      <TrendingList />
      <CategoryList />
      <Footer />
     
    </>

  )
}

export default Home