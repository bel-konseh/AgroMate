

const Hero = () => {
  return (
    <div className="h-screen w-full bg-[url(src/assets/images/landing-bg.png)] bg-fit flex flex-col justify-center items-center relative">
      <div className="inset-0 bg-gradient-to-r from-[#387718F7] to-[#387718F7]/0 z-0 absolute"></div>
      <div className='w-[316px] h-[510px] lg:w-[842px] lg:h-[336px] z-10'>
        <h1 className=' text-white text-[64px]  font-bold '>Your Agricultural Products <br /> at your door step</h1>
        <p className=' mt-5 mb-5 text-white font-medium text-[16px]'>Signup today, place an order and receive the best of Bamenda’s land products <br /> in no time, no matter the price, no matter the cost.</p>

        <button className='bg-[#B6CD27] text-[#387718] pt-[15px] pb-[15px] pr-[18px] pl-[18px]'>Register Now</button>
      </div>
    </div>
  )
}

export default Hero
