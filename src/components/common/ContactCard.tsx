import ButtonGreen from "../ButtonGreen"



const ContactCard = () => {
  return (
    <div className="lg:w-[1187px] flex flex-col lg:h-[480px] border border-blue-700 bg-white md:flex-row p-2 justify-around items-center mb-5 z-10">
      <div className="w-[310px] h-[397px] lg:w-[491px] lg:h-[460px] text-white bg-[#387718] flex flex-col p-10 justify-around">
        <div className="text-center lg:text-left mb-3.5 lg:mb-auto">
            <h2>Contact Information</h2>
            <p>Say something to start a life chat</p>
        </div>
        <ul className="flex flex-col gap-8">
            <li>
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <img src="" className="w-6 h-6 border border-white" alt="" />
                    <a href="tel:+2376555xxx"> +237 678*******</a>
                </div>
            </li>
            <li>
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <img src="" className="w-6 h-6 border border-white" alt="" />
                    <a href="mailto: "> sales@agromate.online</a>
                </div>
            </li>
            <li>
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <img src="" className="w-6 h-6 border border-white" alt="" />
                    <a href="mailto: ">Bambili, Bamenda Cameroon</a>
                </div>
            </li>
            
        </ul>
      </div>
      <div className=" w-[278px] h-[434px] lg:w-[590px] lg:h-[375px] relative">
            <form action="" className=" text-gray-900/50 p-2.5">
                <label htmlFor="name" className=""> First Name</label> <br />
                <input type="text" id="name" className="border-0 border-b border-gray-800/30 w-full " /> <br />
                <div className="flex flex-col md:flex-row justify-between w-full mt-7 mb-10">
                    <span className="w-1/2"><label htmlFor="email"> Email</label> <br />
                    <input type="email" name="" id="email" className=" border-0 border-b border-gray-800/30 w-[95%]" /></span>
                    <span className="w-1/2">
                    <label htmlFor="number" className="text-[#387718]/50"> Phone Number</label>
                    <br />
                    <input type="number" name="" id="number" className="text-[#387718]/90 border-0 border-b border-[#387718]/60 w-full"  value ={23767788888}/>
                    </span>
                </div>
                <label htmlFor="message" className=""> Message</label> <br />
                <input type="text" name="" id="message" className="w-full border-0 border-b border-gray-800/30 mt-6 pt-4" placeholder="Write Your message" />
            
            </form>
            <div className="absolute right-0.5 bottom-0.5">
                <ButtonGreen title="Send Message" />
            </div>
      </div>
    </div>
  )
}

export default ContactCard
