import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ButtonGreen from '../ButtonGreen'
import { useAuth } from '../../context/AuthContext'

const LoginForm = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const { login, userData } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      setError("")
      setLoading(true)
      
      await login(email, password)
      
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || "Failed to log in")
      setLoading(false)
    }
  }

  // Redirect when userData is available after login
  useEffect(() => {
    if (userData) {
      switch(userData.userType) {
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
          navigate('/dashboard')
      }
    }
  }, [userData, navigate])

  return (
    <div className='flex lg:w-[90%] flex-col lg:flex-row lg:justify-center gap-5 items-center bg-[#ffffff]/70 p-5 overflow-clip'>
      <img src="/src/assets/images/login-bg.png" alt="" className='w-[729px] h-[486px] lg:w-[50%] lg:h-[575px] object-cover'/>
      <form onSubmit={handleLogin} className='flex flex-col w-full md:w-[50%] lg:w-[446px] justify-center items-center bg-[#F0FCA5]/80 mt-[-250px] md:mt-[20px] z-10 p-6'>
        <h2 className='text-2xl text-center font-bold text-[#387718] mb-8'>Welcome Back</h2>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-[90%] text-sm'>
            {error}
          </div>
        )}

        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded mb-6 w-[90%] h-[50px]'>
          <input 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            className='border-none focus:border-none w-[80%] outline-none' 
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='flex items-center justify-start gap-2.5 bg-white p-2 text-gray-950/80 border border-green-900/80 rounded w-[90%] h-[50px]'>
          <input 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            className='border-none focus:border-none w-[80%] outline-none' 
            placeholder='Enter your password'
            required
          />
        </div>
        <Link className="mb-20 w-full text-right text-[#387718]/80 px-4" to={'/forgot-password'}>Forgot password?</Link>
        
        <ButtonGreen 
          type='submit' 
          disabled={loading}
          title={loading ? 'Logging in...' : 'Login'}
        />
        <p className='text-sm mt-5'>No account? <Link className='text-[#387718]/80' to={"/signup"}>please signup</Link></p>
      </form>
    </div>
  )
}

export default LoginForm