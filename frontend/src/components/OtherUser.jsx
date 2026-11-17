import React from "react";
import { useSelector } from "react-redux";
import profileImage from "../assets/profileImage.jpg"
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const OtherUser = ({ user }) => {

  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  return (
    <div className='w-full flex items-center gap-3 py-3 border-b border-gray-800'>

      {/* Profile Image */}
      <div onClick={()=>navigate(`/profile/${user.userName}`)}
      className='w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-700'>
        <img
          src={user.profileImage || profileImage}
          className='w-full h-full object-cover'
          alt="User Profile"
        />
      </div>

      {/* User Details */}
      <div className='flex-1 min-w-0'>
        <div className='text-sm text-white font-semibold truncate'>
          {user.userName}
        </div>

        <div className='text-xs text-gray-400 mt-1 truncate'>
          {user.name}
        </div>
      </div>

      {/* Follow Button */}
      <FollowButton targetUserId={user._id} tailwind={'bg-white text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-200 active:scale-95 transition duration-200'}/>
      

    </div>
  );
};

export default OtherUser;