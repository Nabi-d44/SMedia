import React from 'react'
import logo from "../assets/logo.jpg"
import { FaRegHeart } from "react-icons/fa";
import StoryDp from './StoryDp';
import Nav from './Nav';
import { useSelector } from 'react-redux';
import Post from './Post';

const Feed = () => {
  const {postData} = useSelector(state=>state.post)
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-screen lg:h-screen relative lg:overflow-y-auto '>
      <div className='lg:hidden w-full flex items-center justify-between px-6 py-5 border-b border-gray-900'>
        <img className='w-16 h-10 object-contain' src={logo} alt="Logo"/>

        <FaRegHeart className='text-white text-2xl cursor-pointer hover:text-gray-400 transition duration-200' />
      </div>
      <div className='flex w-full overflow-auto gap-5 p-5 items-center'>
        <StoryDp userName={"sdcsju"}/>
        <StoryDp userName={"sdcsju"}/>
        <StoryDp userName={"sdcsju"}/>
        <StoryDp userName={"sdcsju"}/>
        <StoryDp userName={"sdcsju"}/>
        <StoryDp userName={"sdcsju"}/>
        <StoryDp userName={"sdcsju"}/>
        <StoryDp userName={"sdcsjudcvfdvdvdvd"}/>
      </div>
      <div className='w-full min-h-screen items-center gap-5 p-2.5 pt-10 bg-white flex flex-col rounded-t-[60px] relative pb-30'>
        <Nav/>
        {postData?.map((post,idx)=>(
          <Post key={idx} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Feed