import ContactCard from "../components/ContactCard"


const Contact = () => {
  return (
    <main className="h-[600px] bg-[#387718] flex flex-col justify-center items-center">
      <h1 className="text-white w-[226px] h-[60px] font-bold text-4xl">Contact Us</h1>
      <p className="font-medium text-white text-[18px]">Any question or remarks? Just write us a message!</p>

      <ContactCard />
    </main>
  )
}

export default Contact