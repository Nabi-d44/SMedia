import React, { useEffect, useRef, useState } from 'react'
import { IoVolumeMediumSharp } from "react-icons/io5";
import { MdOutlineVolumeOff } from "react-icons/md";

const VideoPlayer = ({media}) => {
    const videoTag = useRef()
    const [mute, setMute] = useState(true)
    const [isPlaying, setisPlaying] = useState(true)

    useEffect(()=>{
        if(videoTag.current){
           videoTag.current.muted = mute 
        }
    },[mute])

    const handleClick = ()=>{
        if(isPlaying){
            videoTag.current.pause()
            setisPlaying(false)
        }else{
            videoTag.current.play()
            setisPlaying(true)
        }
    }
    
  return (
    <div className='h-full relative cursor-pointer max-w-full rounded-2xl overflow-hidden'>
        <video onClick={handleClick} ref={videoTag} src={media} autoPlay loop muted={mute} className='h-full cursor-pointer w-full object-cover rounded-2xl'/>
        <div className='absolute bottom-2.5 right-2.5' 
            onClick={()=>setMute(prev=>!prev)}>
            {!mute ? <IoVolumeMediumSharp className='w-5 h-5 text-white font-semibold'/> :<MdOutlineVolumeOff className='w-5 h-5 text-white font-semibold'/>}
        </div>
    </div>
  )
}

export default VideoPlayer