import React from 'react'
import { MdHome } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { TbDeviceTvFilled } from "react-icons/tb";
import profileImage from "../assets/profileImage.jpg"
import { FiPlusSquare } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)
  return (
    <div className='w-[90%] lg:w-[40%] h-20 bg-black flex justify-around items-center fixed bottom-5 rounded-full shadow-2xl shadow-[#000000] z-100'>
        <div onClick={()=>navigate("/")}><MdHome className='cursor-pointer text-white w-6.5 h-6.5'/></div>
        <div><FaSearch className='text-white w-5.5 h-5.5 cursor-pointer'/></div>
        <div><TbDeviceTvFilled className='text-white w-6.5 h-6.5 cursor-pointer'/></div>
        <div><FiPlusSquare onClick={()=>navigate("/upload")} className='text-white w-6.5 h-6.5 cursor-pointer'/></div>
        <div onClick={()=>navigate(`/profile/${userData.userName}`)}
        className='w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-700'>
          <img src={ userData.profileImage}
            className='w-full h-full object-cover cursor-pointer'
            alt="Profile"
          />
        </div>
    </div>
  )
}

export default Nav