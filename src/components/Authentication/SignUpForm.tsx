import { Link, useNavigate } from 'react-router-dom'
import ButtonGreen from '../ButtonGreen'
import UserTypeCard from './UserTypeCard'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import type { UserType } from '../../types'

const SignUpForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [userType, setUserType] = useState<string>("buyer")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const { signup } = useAuth()
  const navigate = useNavigate()

  // Map display names to actual UserType values
  const userTypeMap: Record<string, UserType> = {
    'Farmer': 'farmer',
    'Buyer': 'buyer',
    'Driver': 'delivery'
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password || !firstName || !lastName) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      setError("")
      setLoading(true)
      
      // Get the actual userType value
      const actualUserType = userTypeMap[userType] || 'buyer'
      
      await signup(email, password, {
        email,
        firstName,
        lastName,
        phone: phone || '',
        userType: actualUserType,
      })

      // Redirect based on user type
      switch(actualUserType) {
        case 'farmer':
          navigate('/dashboard/farmer')
          break
        case 'buyer':
          navigate('/dashboard/buyer')
          break
        case 'delivery':
          navigate('/dashboard/delivery')
          break
        default:
          alert('Account created, but user type is unrecognized.')
          navigate('/signup')
          break
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex lg:w-[80%] flex-col lg:flex-row lg:justify-center gap-5 items-center bg-[#ffffff]/70 p-5 overflow-clip'>
      <img src="/src/assets/images/login-bg.png" alt="" className='w-[729px] h-[486px] lg:w-[50%] lg:h-[575px] object-cover'/>
      <form onSubmit={handleSignUp} className='flex flex-col w-full lg:w-[446px] justify-center items-center bg-[#F0FCA5]/80 mt-[-250px] md:mt-[20px] z-10 p-6'>
        <h2 className='text-2xl text-center font-bold text-[#387718] mb-4'>Welcome, choose your account type</h2>
        
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-[90%] text-sm'>
            {error}
          </div>
        )}

        <div className='flex gap-2.5 align-baseline mb-4'>
          <UserTypeCard 
            userTypeState={userType} 
            setUserTypeState={setUserType} 
            userType='Farmer' 
            thumbnail='/src/assets/icons/farmer.png'
          />
          <UserTypeCard 
            setUserTypeState={setUserType} 
            userTypeState={userType} 
            userType='Buyer' 
            thumbnail='/src/assets/icons/buyer.png' 
          />
          <UserTypeCard 
            setUserTypeState={setUserType} 
            userTypeState={userType} 
            userType='Driver' 
            thumbnail='/src/assets/icons/driver.png'
          />
        </div>

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-3 w-[90%] h-[50px]'>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e)=>setFirstName(e.target.value)} 
            className='border-none focus:border-none w-[80%] outline-none' 
            placeholder='First Name'
            required
          />
        </div>

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-3 w-[90%] h-[50px]'>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e)=>setLastName(e.target.value)} 
            className='border-none focus:border-none w-[80%] outline-none' 
            placeholder='Last Name'
            required
          />
        </div>

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-3 w-[90%] h-[50px]'>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e)=>setPhone(e.target.value)} 
            className='border-none focus:border-none w-[80%] outline-none' 
            placeholder='Phone Number (Optional)'
          />
        </div>

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-3 w-[90%] h-[50px]'>
          <input 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            className='border-none focus:border-none w-[80%] outline-none' 
            placeholder='Enter your email'
            required
          />
        </div>

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-6 w-[90%] h-[50px]'>
          <input 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            className='border-none focus:border-none w-[80%] outline-none' 
            placeholder='Enter your password'
            required
            minLength={6}
          />
        </div>
        
        <div className='mt-4'>
          <ButtonGreen 
            type='submit' 
            disabled={loading}
            title={loading ? 'Signing up...' : 'SignUp'}
          />
        </div>
        <p className='text-sm mt-5'>Already have an account? <Link className='text-[#387718]/80' to={"/login"}>Login</Link></p>
      </form>
    </div>
  )
}

export default SignUpForm