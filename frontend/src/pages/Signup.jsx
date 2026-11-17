import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {ClipLoader} from 'react-spinners'
import logo from "../assets/logo.jpg"
import axios from 'axios'
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setuserData } from '../redux/userSlice';

const Signup = () => {

  const [showpassword, setshowpassword] = useState(false)
  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [userName, setuserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const handleSignup = async () => {
    setloading(true)
    setError("")
    
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,
        { name, userName, email, password },{ withCredentials: true })
      dispatch(setuserData(result.data))
      setloading(false)
    } catch (error) {
      setError(error.response?.data?.message)
      console.log("error", error)
      setloading(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-linear-to-br from-gray-950 via-black to-purple-950 flex justify-center items-center p-4'>

      {/* Signup Card */}
      <div className='w-full max-w-lg bg-white rounded-2xl flex flex-col justify-center items-center p-8 shadow-2xl shadow-purple-900/30'>

        {/* Logo and Heading */}
        <div className='flex flex-col items-center gap-2 mb-4'>
          <img
            className='w-16 h-16 object-cover rounded-xl'
            src={logo}
            alt="Logo"
          />

          <h1 className='text-3xl font-extrabold text-gray-900'>
            Sign Up
          </h1>

          <p className='text-sm text-gray-500'>
            Create your account to get started
          </p>
        </div>

        {/* Name */}
        <div className='w-full mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor='name'>
            Enter your Name
          </label>

          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            type='text'
            id='name'
            placeholder='Your full name'
            required
            className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition duration-200'
          />
        </div>

        {/* Username */}
        <div className='w-full mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor='userName'>
            Enter your Username
          </label>

          <input
            onChange={(e) => setuserName(e.target.value)}
            type='text'
            id='userName'
            value={userName}
            placeholder='Choose a username'
            required
            className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition duration-200'
          />
        </div>

        {/* Email */}
        <div className='w-full mb-4'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor='email'>
            Enter your Email
          </label>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            id='email'
            value={email}
            placeholder='example@email.com'
            required
            className='w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition duration-200'
          />
        </div>

        {/* Password */}
        <div className='w-full mb-5'>
          <label className='block text-sm font-semibold text-gray-700 mb-2' htmlFor='password'>
            Enter your Password
          </label>

          <div className='relative'>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showpassword ? "text" : "password"}
              id='password'
              value={password}
              placeholder='Create a password'
              required
              className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition duration-200'
            />

            <button
              type="button"
              onClick={() => setshowpassword(!showpassword)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-700 transition'
            >
              {showpassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {error && <p className='text-red-500'>{error}</p>}
        {/* Signup Button */}
        <button disabled={loading}
          onClick={handleSignup}
          className='w-full bg-purple-800 text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-700 active:scale-[0.98] shadow-md hover:shadow-lg transition duration-200'
        >{loading?<ClipLoader size={30} color='black'/>:"Sign Up"} 
        </button>

        {/* Login Link */}
        <p className='text-sm text-gray-600 mt-5' >
          Already have an account?
          <span onClick={()=>navigate("/login")} href="/login" className='ml-1 text-purple-700 font-bold hover:text-purple-900 hover:underline'>
            Log In
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup
