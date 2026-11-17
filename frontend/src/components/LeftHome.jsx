import React from 'react'
import logo from "../assets/logo.jpg"
import profileImage from "../assets/profileImage.jpg"
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setuserData } from '../redux/userSlice';
import OtherUser from './OtherUser';

const LeftHome = () => {

  const { userData, suggestedUsers } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/auth/logout`,
        { withCredentials: true }
      )
      dispatch(setuserData(null))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-[25%] hidden lg:block min-h-screen bg-black border-r border-gray-900'>

      {/* Logo and Heart */}
      <div className='w-full flex items-center justify-between px-6 py-5 border-b border-gray-900'>
        <img className='w-16 h-10 object-contain' src={logo} alt="Logo"/>

        <FaRegHeart className='text-white text-2xl cursor-pointer hover:text-gray-400 transition duration-200' />
      </div>

      {/* User Profile */}
      <div className='w-full flex items-center gap-3 px-6 py-5 border-b border-gray-900'>

        <div className='w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-700'>
          <img
            src={userData?.profileImage || profileImage}
            className='w-full h-full object-cover'
            alt="Profile"
          />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='text-sm text-white font-semibold truncate'>
            {userData?.userName}
          </div>

          <div className='text-xs text-gray-400 mt-1 truncate'>
            {userData?.name}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className='text-blue-500 text-sm font-semibold hover:text-blue-400 transition duration-200'
        >
          Log Out
        </button>

      </div>

      {/* Suggested Users */}
      <div className='w-full px-6 py-5'>

        <h1 className='text-white text-base font-semibold mb-5'>
          Suggested Users
        </h1>

        <div className='flex flex-col gap-3'>
          {suggestedUsers && suggestedUsers.slice(0, 3).map((user, index) => (
            <OtherUser key={user._id || index} user={user} />
          ))}
        </div>

      </div>

    </div>
  )
}

export default LeftHome