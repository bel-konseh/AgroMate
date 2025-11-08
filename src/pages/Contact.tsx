import ContactCard from "../components/common/ContactCard"


const Contact = () => {
  return (
    <main className="lg:h-[700px] bg-[#387718] flex flex-col justify-center items-center bg-[url('src/assets/images/contact-bg.png')] lg:p-3 relative mt-16 md:mt-20">
      <div className="absolute inset-0 bg-[url('src/assets/images/contact-gradient.png')]"></div>
      <h1 className="text-white z-10 w-[226px] h-[60px] font-bold text-4xl mt-6 text-center ">Contact Us</h1>
      <p className="font-medium text-white text-[18px] mb-4 z-10">Any question or remarks? <br />Just write us a message!</p>

      <ContactCard />
    </main>
  )
}

export default Contact