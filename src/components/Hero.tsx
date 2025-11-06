
import React from 'react'

const Hero = () => {
  return (
    <div className='h-screen w-full bg-gradient-to-r from-[#387718] via-[#387718] to-[#3d4b5e77] flex flex-col justify-center items-center'>
      <div className='w-[842px] h-[336px]'>
        <h1 className=' text-white text-[64px]  font-bold '>Your Agricultural Products <br /> at your door step</h1>
        <p className=' mt-5 mb-5 text-white font-medium text-[16px]'>Signup today, place an order and receive the best of Bamenda’s land products <br /> in no time, no matter the price, no matter the cost.</p>

        <button className='bg-[#B6CD27] text-[#387718] pt-[15px] pb-[15px] pr-[18px] pl-[18px]'>Register Now</button>
      </div>
    </div>
  )
}

export default Hero
