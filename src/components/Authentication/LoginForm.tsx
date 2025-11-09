

import { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonGreen from '../ButtonGreen'

const LoginForm = () => {

  const [email, setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  // const handleLogin = ():void =>{

  // }

  return (
    
    <div className='flex lg:w-[80%] flex-col lg:flex-row lg:justify-center  gap-5  items-center bg-[#ffffff]/70 p-5 overflow-clip'>
      <img src="/src/assets/images/login-bg.png" alt="" className='w-[729px] h-[486px] lg:w-[50%] lg:h-[575px] object-cover'/>
      <form action="" method="POST" className='flex flex-col w-full lg:w-[446px] justify-center items-center bg-[#F0FCA5]/80 mt-[-250px] md:mt-[20px] z-10'>
        <h2 className='text-2xl text-center font-bold text-[#387718] mb-8 '>Welcome Back</h2>

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-6 w-[90%] h-[50px]'>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="" id="" className=' border-none focus:border-none w-[80%] outline-none'  placeholder='Enter your email'/><br />
        </div>
        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded w-[90%] h-[50px]'>
            <input type="password" name="" value={password} onChange={(e)=>setPassword(e.target.value)} id="" className='border-none focus:border-none w-[80%] outline-none' placeholder='Enter your password'/><br />
        </div>
        <Link  className="mb-20  w-full text-right text-[#387718]/80 " to={'#'} >Forgot password?</Link>
        
        <ButtonGreen title='Login'/>
        <p className='text-sm mt-5'>No account? <Link className='text-[#387718]/80' to={"/signup"}>please signup</Link></p>
      </form>
    </div>
  )
}

export default LoginForm
