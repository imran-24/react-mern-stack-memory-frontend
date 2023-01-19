import React from 'react'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'

const Home = () => {
  
  return (
    <div className="h-full w-full flex flex-col items-center">
        <Navbar />
        <Feed />
        
    </div>
  )
}

export default Home