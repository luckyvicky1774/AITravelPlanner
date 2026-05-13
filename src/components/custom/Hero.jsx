import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[50px] text-center mt-16'>
            <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> <br /> Personalized Planning at Your Fingertips
        </h1>

        <p className='text-xl text-gray-600 text-center'>
            AI-powered travel planner helps you discover the best activities and accommodations for your next trip.
        </p>

        <Link to='/create-trip'>
            <Button>
                Get Started, It's Free!
            </Button>
        </Link>

        <img src="/landing.png" alt="hero" className='w-full h-full object-cover rounded-xl' />
        
    </div>
  )
}

export default Hero