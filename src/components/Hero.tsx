

const Hero = () => {
  return (
    <div className="h-screen w-full bg-[url(src/assets/images/landing-bg.png)] bg-fit flex flex-col justify-center items-center relative bg-center bg-cover">
      <div className="inset-0 bg-gradient-to-r from-[#387718F7] to-[#387718F7]/0 z-0 absolute"></div>
      <div className='w-[316px] h-full lg:w-[842px] lg:h-[336px] z-10'>
        <h1 className=' text-white text-[48px] lg:text-[64px] font-bold '>Your Agricultural Products <br /> at your door step</h1>
        <p className=' mt-5 mb-5 text-white font-medium text-[16px]'>Signup today, place an order and receive the best of Bamenda’s land products <br /> in no time, no matter the price, no matter the cost.</p>

        <button className='bg-[#B6CD27] text-[#387718] pt-[15px] pb-[15px] pr-[18px] pl-[18px]'>Register Now</button>
      </div>

      <svg 
          className="absolute bottom-0 w-full text-[#B6CD27] h-50 md:h-40" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {/* This path creates a simple large curve similar to the design */}
          <path fillOpacity="1" d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,245.3C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
    </div>
  )
}

export default Hero
