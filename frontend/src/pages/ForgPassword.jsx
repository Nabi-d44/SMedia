import axios from 'axios'
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'

const ForgPassword = () => {

  const [Step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setotp] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [confirmnewPassword, setconfirmnewPassword] = useState("")

  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")

  const handleStep1 = async ()=>{
    setloading(true)
    setError("")
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendOtp`,{email},{withCredentials:true})
      console.log(result.data)
      setloading(false)
      setStep(2)
    } catch (error) {
      console.log(error)
      setloading(false)
      setError(error.response?.data?.message)
    }
  }

  const handleStep2 = async ()=>{
    setloading(true)
    setError("")
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyOtp`,{email,otp},{withCredentials:true})
      console.log(result.data)
      setloading(false)
      setStep(3)
    } catch (error) {
      console.log(error)
      setloading(false)
      setError(error.response?.data?.message)
    }
  }

  const handleStep3 = async ()=>{
    if(newPassword !== confirmnewPassword){
        return setError("password doesnot match")
      }
    setloading(true)
    setError("")
    try {
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword`,{email,password:newPassword},{withCredentials:true})
      console.log(result.data)
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)
      setError(error.response?.data?.message)
    }
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-purple-950 via-[#2F004F] to-black flex justify-center items-center p-4'>

      {/* Main Card */}
      <div className='w-full max-w-lg bg-purple-950/80 border border-purple-500/40 rounded-2xl p-8 shadow-2xl shadow-purple-950'>

        {/* Step 1: Email */}
        {Step === 1 && (
          <div>
            <h2 className='text-3xl font-extrabold text-white text-center mb-3'>
              Forgot Password?
            </h2>

            <p className='text-purple-200 text-sm text-center mb-8'>
              Enter your email address to receive an OTP.
            </p>

            <div className='w-full mb-6'>
              <label className='block text-sm font-semibold text-purple-100 mb-2' htmlFor='email'>
                Enter your Email
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                value={email}
                id='email'
                placeholder='example@email.com'
                required
                className='w-full px-4 py-3 bg-purple-900/60 text-white placeholder-purple-300 border border-purple-500/50 rounded-lg outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/40 transition duration-200'
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <button onClick={handleStep1}
              disabled={loading}
              className='w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-500 disabled:opacity-60 active:scale-[0.98] shadow-lg transition duration-200'
            >
              {loading ? <ClipLoader size={25} color='white' /> : "Send OTP"}
            </button>
          </div>
        )}

        {/* Step 2: OTP */}
        {Step === 2 && (
          <div>
            <h2 className='text-3xl font-extrabold text-white text-center mb-3'>
              Verify OTP
            </h2>

            <p className='text-purple-200 text-sm text-center mb-8'>
              Enter the OTP sent to your email.
            </p>

            <div className='w-full mb-6'>
              <label className='block text-sm font-semibold text-purple-100 mb-2' htmlFor='otp'>
                Enter your OTP
              </label>

              <input
                onChange={(e) => setotp(e.target.value)}
                type='text'
                id='otp'
                value={otp}
                placeholder='Enter OTP'
                required
                className='w-full px-4 py-3 bg-purple-900/60 text-white placeholder-purple-300 border border-purple-500/50 rounded-lg outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/40 transition duration-200'
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <button onClick={handleStep2}
              disabled={loading}
              className='w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-500 disabled:opacity-60 active:scale-[0.98] shadow-lg transition duration-200'
            >
              {loading ? <ClipLoader size={25} color='white' /> : "Submit OTP"}
            </button>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {Step === 3 && (
          <div>
            <h2 className='text-3xl font-extrabold text-white text-center mb-3'>
              Reset Password
            </h2>

            <p className='text-purple-200 text-sm text-center mb-8'>
              Create a new password for your account.
            </p>

            <div className='w-full mb-4'>
              <label className='block text-sm font-semibold text-purple-100 mb-2' htmlFor='newPassword'>
                Enter New Password
              </label>

              <input
                onChange={(e) => setnewPassword(e.target.value)}
                type='password'
                id='newPassword'
                value={newPassword}
                placeholder='Enter new password'
                required
                className='w-full px-4 py-3 bg-purple-900/60 text-white placeholder-purple-300 border border-purple-500/50 rounded-lg outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/40 transition duration-200'
              />
            </div>

            <div className='w-full mb-6'>
              <label className='block text-sm font-semibold text-purple-100 mb-2' htmlFor='confirmnewpassword'>
                Confirm New Password
              </label>

              <input
                onChange={(e) => setconfirmnewPassword(e.target.value)}
                type='password'
                id='confirmnewpassword'
                value={confirmnewPassword}
                placeholder='Confirm new password'
                required
                className='w-full px-4 py-3 bg-purple-900/60 text-white placeholder-purple-300 border border-purple-500/50 rounded-lg outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-500/40 transition duration-200'
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <button onClick={handleStep3}
              disabled={loading}
              className='w-full bg-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-500 disabled:opacity-60 active:scale-[0.98] shadow-lg transition duration-200'
            >
              {loading ? <ClipLoader size={25} color='white' /> : "Reset Password"}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ForgPassword
