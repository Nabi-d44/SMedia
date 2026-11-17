import React, { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setprofileData, setuserData } from "../redux/userSlice";
import { MdOutlineArrowBackIos } from "react-icons/md";
import profileImage from "../assets/profileImage.jpg";
import Nav from "../components/Nav";
import FollowButton from "../components/FollowButton";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);
  console.log(profileData?.followers)

  const handleProfile = async () => {
    try {
      const result = await axios.get(`
        ${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true },
      );
      dispatch(setprofileData(result.data));
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setuserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center">
      {/* TOP BAR */}
      <div className="w-full h-16 sm:h-20 flex justify-between items-center px-4 sm:px-8 text-white">
        <div onClick={() => navigate("/")}><MdOutlineArrowBackIos           className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="font-semibold text-[18px] sm:text-[20px] truncate px-2">
          {profileData?.userName}
        </div>
        <div
          onClick={handleLogout}
          className="font-semibold cursor-pointer text-blue-500 text-[16px] sm:text-[20px] whitespace-nowrap"
        >
          Log Out
        </div>
      </div>

      {/* PROFILE INFO */}
      <div className="w-full flex flex-col items-center px-4">
        <div className="flex items-start justify-center gap-4 sm:gap-5">
          
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border border-gray-700">
            <img src={profileData?.profileImage || profileImage}
              className="w-full h-full object-cover"
              alt="Profile"/>
          </div>
          <div className="flex flex-col items-start pt-1">
            <div className="font-semibold text-white text-[18px] sm:text-[22px]">
              {profileData?.name}
            </div>
            <div className="text-gray-400 text-sm">
              {profileData?.profession || "New User"}
            </div>
            <div className="text-white text-sm max-w-50 sm:max-w-xs wrap-break-word">
              {profileData?.bio}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="text-white flex justify-center items-start gap-6 sm:gap-10 mt-6">
          {/* Posts */}
          <div className="flex flex-col items-center">
            <div className="font-bold text-lg">
              {profileData?.posts?.length ?? 0}
            </div>
            <div className="text-gray-400 text-sm">Posts</div>
          </div>

          {/* Followers */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
              <div className="relative h-8" style={{width :32 + Math.max(Math.min(profileData?.followers?.length ??0,3)-1,0)*12}}>
                {profileData?.followers?.slice(0,3).map((user,idx)=>{
                  <div className="absolute top-0 w-8 h-8 border-2 border-white rounded-full overflow-hidden "
                  style={{left: idx *12}}>
                  <img src={user?.profileImage || profileImage}
                    alt=""
                    className="w-full h-full object-cover"/>
                </div>
                })}
              </div>
              <div className="font-bold text-lg">
                {profileData?.followers?.length ?? 0}
              </div>
            </div>
            <div className="text-gray-400 text-sm">Followers</div>
          </div>

          {/* Following */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
              <div className="flex relative w-13 h-13">
                <div className="w-8 h-8 border-2 border-black rounded-full overflow-hidden">
                  <img src={profileData?.profileImage || profileImage}
                    alt=""
                    className="w-full h-full object-cover"/>
                </div>
                <div className="w-8 h-8 absolute left-2.5 border-2 border-black rounded-full overflow-hidden">
                  <img src={profileData?.profileImage || profileImage}
                    alt=""
                    className="w-full h-full object-cover"/>
                </div>
                <div className="w-8 h-8 absolute left-5 border-2 border-black rounded-full overflow-hidden">
                  <img src={profileData?.profileImage || profileImage}
                    alt=""
                    className="w-full h-full object-cover"/>
                </div>
              </div>
              <div className="font-bold text-lg">
                {profileData?.following?.length ?? 0}
              </div>
            </div>
            <div className="text-gray-400 text-sm">Following</div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-5 flex justify-center gap-3">
          {profileData?._id == userData?._id ? (
            <button onClick={()=>navigate("/editprofile")}
            className="bg-white text-black font-semibold text-sm px-8 py-1.5 rounded-full">
              Edit Profile
            </button>
          ) : (
            <>
              <FollowButton onFollowChange={handleProfile} targetUserId={profileData?._id} tailwind={"bg-white text-black font-semibold text-sm px-8 py-1.5 rounded-full"}/>
              <button className="bg-zinc-800 text-white font-semibold text-sm px-8 py-1.5 rounded-full">
                Message
              </button>
            </>
          )}
        </div>
      </div>

      {/* POSTS SECTION */}
      <div className="w-full flex justify-center px-4 mt-6">
        <div className="w-full max-w-225 min-h-screen flex flex-col items-center rounded-t-[30px] bg-white relative gap-5 pt-7.5 pb-28">
          {/* posts go here */}
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Profile;
{/* <div className="w-full min-h-[100vh] flex justify-center mt-6">
//         <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]">
//             <Nav />
//         </div>
//         </div> */}