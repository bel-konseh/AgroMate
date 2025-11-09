import { Link } from 'react-router-dom'
import ButtonGreen from '../ButtonGreen'
import UserTypeCard from './UserTypeCard'

import { useState } from 'react'

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [userType, setUserType] = useState<string>("Buyer")

  const handleSignUp =()=>{

  }
return (
    <div className='flex lg:w-[80%] flex-col lg:flex-row lg:justify-center  gap-5  items-center bg-[#ffffff]/70 p-5 overflow-clip'>
      <img src="/src/assets/images/login-bg.png" alt="" className='w-[729px] h-[486px] lg:w-[50%] lg:h-[575px] object-cover'/>
      <form action="" className='flex flex-col w-full lg:w-[446px] justify-center items-center bg-[#F0FCA5]/80 mt-[-250px] md:mt-[20px] z-10'>
        <h2 className='text-2xl text-center font-bold text-[#387718] mb-4 '>Welcome, choose your account type</h2>
        <div className='flex gap-2.5 align-baseline mb-4'>
            
            <UserTypeCard userTypeState={userType} setUserTypeState ={setUserType} userType='Farmer' thumbnail='/src/assets/icons/farmer.png'/>
            <UserTypeCard setUserTypeState ={setUserType} userTypeState={userType}  userType='Buyer' thumbnail='/src/assets/icons/buyer.png' />
            <UserTypeCard setUserTypeState ={setUserType} userTypeState={userType}  userType='Driver' thumbnail='/src/assets/icons/driver.png'/>


           
            
        </div>

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-6 w-[90%] h-[50px]'>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="" id="" className=' border-none focus:border-none w-[80%] outline-none'  placeholder='Enter your email'/><br />
        </div>
        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded w-[90%] h-[50px]'>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="" id="" className='border-none focus:border-none w-[80%] outline-none' placeholder='Enter your password'/><br />
        </div>
        
        
        <div className=' mt-20'>
            <ButtonGreen onClick={handleSignUp} title='SignUp'/>
        </div>
        <p className='text-sm mt-5'>Already have an account? <Link className='text-[#387718]/80' to={"/login"}>Login</Link></p>
      </form>
    </div>
  )
}

export default SignUpForm
