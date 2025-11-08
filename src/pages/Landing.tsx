import Hero from "../components/Hero"



function Landing() {
  return (
    <main className="w-full mt-16 md:mt-20">
      <Hero />
      <div className=" w-full h-[523px] bg-[#B6CD27] flex flex-col justify-center items-center p-12">
        <div className="flex flex-col md:flex-row h-[387px] w-1088px] justify-center items-center">
          <img src="/src/assets/images/computer.png" alt=""  className=" w-72 lg:w-[581px] lg:h-[387px]"/>
          <p className=" text-4xl lg:w-[507px] text-center lg:text-left lg:h-[192px] text-white font-bold lg:text-[40px]">With our user friendly interface get your fresh products right at your doorstep</p>
        </div>
      </div>
      <div className=" flex flex-col lg:flex-row w-full h-[464px] bg-[#387718] justify-around items-center">
        <img src="/src/assets/icons/van.png" alt="" className="w-28" />
        <p className="w-[396px] text-white font-bold text-3xl text-center">Earn money as a delivery person or a seller. </p>
        <img src="/src/assets/icons/brief-case.png" alt="" className="w-28"/>
      </div>
    </ main>
  )
}

export default Landing
