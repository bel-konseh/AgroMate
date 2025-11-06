


function Footer() {
  return (
    <div className="w-full bg-white flex flex-col h-[506px] justify-center items-center gap-4 mt-5">
      <div className=" flex flex-col md:flex-row justify-around items-center w-full mt-4 ">
        <h1 className="font-bold text-3xl text-green-800">Agromate</h1>
        <div className="w-[200px] h-52">
            <h3 className="font-bold text-[16px] text-[#387718] mb-3">Product</h3>
            <ul className="text-[#387718] text-[16px] font-medium">
                <li>Home</li>
                <li>Shop</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Become a delivery Person</li>
                <li>Become a seller</li>
            </ul>
        </div>

        <div className="w-[200px] h-52">
            <h3 className="font-bold text-[16px] text-[#387718] mb-3">Explore</h3>
            <ul className="text-[#387718] text-[16px] font-medium">
                <li>Resources</li>
                <li>Blog</li>
                <li>Documents</li>
            
            </ul>
        </div>

        <div className="w-[200px] h-52">
            <h3 className="font-bold text-[16px] text-[#387718] mb-3">Office location</h3>
            <ul className="text-[#387718] text-[16px] font-medium">
                <li>Bambili, Cameroon</li>
                <li>Shop</li>
               
            </ul>
        </div>


      </div>
      <div className=" w-full mt-8 flex justify-around items-center text-green-700 ">
        <p>contact@agromate.com</p>
        <p>+23767777798</p>
      </div>
    </div>
  )
}

export default Footer
