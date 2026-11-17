import React, { useRef, useState } from "react";
import axios from "axios";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/profileImage.jpg";
import { serverUrl } from "../App";
import { setprofileData, setuserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const { userData,profileData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)

  const imageInput = useRef()
  const [frontendImage, setFrontendImage] = useState(userData.profileImage || profileImage)
  const [backendImage, setBackendImage] = useState(null)
  const [name, setName] = useState(userData.name || "")
  const [userName, setuserName] = useState(userData.userName || "")
  const [profession, setProfession] = useState(userData.profession || "")
  const [bio, setBio] = useState(userData.bio || "")
  const [gender, setGender] = useState(userData.gender || "")
  const dispatch = useDispatch()
  const handleImage = (e)=>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  const handleEditProfile = async ()=>{
    setloading(true)
    try {
      const formData = new FormData()
      formData.append("name",name)
      formData.append("userName",userName)
      formData.append("bio",bio)
      formData.append("profession",profession)
      formData.append("gender",gender)
      if(backendImage){
        formData.append("profileImage",backendImage)
      }
      const result = await axios.post(`${serverUrl}/api/user/editProfile`,formData,{withCredentials : true})
      dispatch(setprofileData(result.data))
      dispatch(setuserData(result.data))
      setloading(false)
      navigate(`/profile/${userData.userName}`)
    } catch (error) {
      setloading(false)
      console.log("Error",error)
    }
  }
  return (
    <div className="w-full min-h-screen bg-black flex items-center flex-col gap-5">
      <div className="w-full h-20 flex items-center gap-5 px-5 ">
        <MdOutlineArrowBackIos
          onClick={() => navigate(`/profile/${userData.userName}`)}
          className="text-white cursor-pointer w-5 h-5 sm:w-6 sm:h-6"
        />
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>
      <div className=" w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border border-gray-700"  onClick={()=>imageInput.current.click()}>
        <input onChange={handleImage} type="file" accept="image/*" ref={imageInput} hidden/>
        <img src={frontendImage}
          className="w-full h-full object-cover"
          alt="Profile"/>
      </div>

      <div onClick={()=>imageInput.current.click()} className="cursor-pointer text-blue-500 text-center text-[18px] font-semibold">Change Your Profile Picture</div>
      <input onChange={(e)=>setName(e.target.value)} value={name} className="w-[90%] max-w-150 h-14.5 bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none" type="text" placeholder="Enter Your Name" />
      <input onChange={(e)=>setuserName(e.target.value)} value={userName} className="w-[90%] max-w-150 h-14.5 bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none" type="text" placeholder="Enter Your UserName" />
      <input onChange={(e)=>setBio(e.target.value)} value={bio} className="w-[90%] max-w-150 h-14.5 bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none" type="text" placeholder="Enter Your Bio" />
      <input onChange={(e)=>setProfession(e.target.value)} value={profession} className="w-[90%] max-w-150 h-14.5 bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none" type="text" placeholder="Enter Your Profession" />
      <input onChange={(e)=>setGender(e.target.value)} value={gender} className="w-[90%] max-w-150 h-14.5 bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none" type="text" placeholder="Enter Your Gender" />

      <button onClick={handleEditProfile} className="bg-white text-black font-semibold text-sm px-8 py-1.5 rounded-full">{loading?<ClipLoader size={30} color="black"/> :"Save Profile"}</button>
    </div>
  );
};

export default EditProfile;
