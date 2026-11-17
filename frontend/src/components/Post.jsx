import React, { useState } from "react";
import profileImage from "../assets/profileImage.jpg";
import VideoPlayer from "./VideoPlayer";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FaRegComment } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { serverUrl } from "../App";
import axios from "axios"
import { setpostData } from "../redux/postSlice";
import { setuserData } from "../redux/userSlice";
import FollowButton from "./FollowButton";


const Post = ({ post }) => {
  // console.log(post)
  
  const {userData} = useSelector(state=>state.user)
  const {postData} = useSelector(state=>state.post)
  // console.log(userData)
  const dispatch = useDispatch()
  const [showComment, setShowComment] = useState(false)
  const [message, setMessage] = useState("")
  const handleLike = async ()=>{
    try {
      const result = await axios.post(`${serverUrl}/api/post/like/${post._id}`,{},{withCredentials : true})
      const updatedPost = result.data
      const updatedPosts = postData.map(p=>p._id == post._id ? updatedPost : p)
      dispatch(setpostData(updatedPosts))
    } catch (error) {
      console.log("Error",error)
    }
  }

  const handleComment = async ()=>{
    try {
      const result = await axios.post(`${serverUrl}/api/post/comment/${post._id}`,{message},{withCredentials : true})
      const updatedPost = result.data
      const updatedPosts = postData.map(p=>p._id == post._id ? updatedPost : p)
      dispatch(setpostData(updatedPosts))
    } catch (error) {
      console.log("Error",error)
    }
  }

  const handleSaved = async ()=>{
    try {
      const result = await axios.post(`${serverUrl}/api/post/saved/${post._id}`,{},{withCredentials : true})
      console.log(result.data.saved)
      dispatch(setuserData(result.data))
    } catch (error) {
      console.log("Error",error)
    }
  }
  return (
    <div className="w-[90%] flex flex-col gap-2.5 bg-white items-center shadow-2xl shadow-[#231f1f] rounded-2xl pb-5">
      <div className="w-full h-20 flex justify-between items-center px-2.5">
        <div className="flex justify-center items-center gap-5 md:gap-5">
          <div className="w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden shrink-0 border border-gray-700">
            <img src={post.author.profileImage || profileImage}
              className="w-full h-full object-cover"
              alt="Profile"/>
          </div>
          <div className="w-25 font-semibold truncate">
            {post.author.userName}
          </div>
        </div>
        {userData._id != post.author._id && <FollowButton targetUserId={post.author._id} tailwind={"px-2.5 w-15 md:w-25 py-1.5 h-7.5 md:h-10 bg-black text-white rounded-2xl text-3.5 md:text-4"}/>}
      </div>
      <div className="w-[90%] flex items-center justify-center">
        {post.mediaType == "Image" && (
          <div className="w-[90%] flex items-center justify-center ">
            <img src={post.media}
              className="w-[80%] rounded-2xl object-cover"/>
          </div>
        )}

        {post.mediaType == "Video" && (
          <div className="w-[80%] flex flex-col items-center justify-center ">
            <VideoPlayer media={post.media} />
          </div>
        )}
      </div>
      <div className="w-full h-15 flex justify-between items-center px-5 mt-2.5">
        <div className="flex justify-center items-center gap-2.5">
            <div  className="flex justify-center items-center gap-1.25">
                {!post.likes.includes(userData._id) && <IoHeartOutline 
                onClick={handleLike} className="cursor-pointer" size={30}/>}
                {post.likes.includes(userData._id) && <IoHeartSharp 
                onClick={handleLike} className="cursor-pointer text-red-500" size={30}/>}
                <span>{post.likes.length}</span>
            </div>
            <div onClick={()=>setShowComment(prev=>!prev)} className="flex justify-center items-center gap-1.25"><FaRegComment className="cursor-pointer" size={30}/></div>
            <span>{post.comments.length}</span>
        </div>
        <div onClick={handleSaved}>
          {!userData.saved.some(s=>(s._id || s).toString() === post._id.toString()) && <CiBookmark size={30}/>}
          {userData.saved.some(s=>(s._id || s).toString() === post._id.toString()) && <FaBookmark size={30}/>}
        </div>     
      </div>
      {post.caption && <div className="w-full px-5 gap-2.5 flex justify-start items-center">
          <h1>{post.author.userName}</h1>
          <div className="font-semibold">{post.caption}</div>
        </div>}
      {showComment && <div className="w-full flex flex-col gap-7.5 pb-5">
        <div className="w-full h-20 flex items-center justify-between px-5 relative">
        <div className="w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden shrink-0 border border-gray-700">
            <img src={post.author.profileImage || profileImage}
              className="w-full h-full object-cover" alt="Profile"/>
          </div>
          <input onChange={(e)=>setMessage(e.target.value)} value={message} type="text" className="px-2.5 border-b-2 border-b-gray-500 w-[90%]  outline-none h-10 " placeholder="Write Comment.."/>
          <button  onClick={handleComment} className="absolute right-5 cursor-pointer"><IoMdSend size={30}/></button>
          </div>
          <div className="w-full max-h-75 overflow-auto ">
            {post.comments?.map((comm,idx)=>(
              <div className="w-full px-5 py-5 flex items-center gap-5 border-b-2 border-b-gray-200" key={idx}>
              <div className="w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden shrink-0 border border-gray-700">
            <img src={comm.author.profileImage || profileImage}
              className="w-full h-full object-cover"
              alt="Profile"/>
          </div>
          <div>{comm.message}</div>
          </div>
            ))}
            
          </div>
        </div>}
    </div>
  );
};

export default Post;
