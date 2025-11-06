import Hero from "../components/Hero"



function Landing() {
  return (
    <main className="w-full">
      <Hero />
      <div className=" w-full h-[523px] bg-[#B6CD27] flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row h-[387px] w-1088px] justify-center items-center">
          <img src="" alt=""  className="w-[581px] h-[387px] border border-amber-950"/>
          <p className=" w-[507px] h-[192px] text-white font-bold text-[40px]">With our user friendly interface get your fresh products right at your doorstep</p>
        </div>
      </div>
      <div className="w-full h-[464px] bg-[#387718] flex justify-center items-center">
        <img src="" alt="" />
        <p className="w-[396px] text-white font-bold text-3xl">Earn money as a delivery person or a seller. </p>
        <img src="" alt="" />
      </div>
    </ main>
  )
}

export default Landing