import React, { useRef, useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiPlusSquare } from "react-icons/fi";
import VideoPlayer from "../components/VideoPlayer";
import axios from "axios"
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setpostData } from "../redux/postSlice";
import { setstoryData } from "../redux/storySlice";
import { setshortsData } from "../redux/shortsSlice";
import { ClipLoader } from "react-spinners";

const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setFrontendMedia] = useState("")
    const [backendMedia, setBackendMedia] = useState("")
    const [mediaType, setMediaType] = useState("")
    const [caption, setCaption] = useState("")
    const mediaInput = useRef()
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const {postData} = useSelector(state=>state.post)
    const {shortsData} = useSelector(state=>state.shorts)
    const {storyData} = useSelector(state=>state.story)

    const handleMedia = (e)=>{
        const file = e.target.files[0]
        console.log(file)
        if(file.type.includes("image")){
            setMediaType("Image")
        }else{
            setMediaType("Video")
        }
        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }
        const uploadPost = async ()=>{
          setloading(true)
          try {
            const formData = new FormData()
            formData.append("caption",caption)
            formData.append("mediaType",mediaType)
            formData.append("media",backendMedia)
            const result = await axios.post(`${serverUrl}/api/post/upload`,formData,{withCredentials:true})
            console.log("Result",result)
            dispatch(setpostData([...postData,result.data]))
            setloading(false)
            navigate("/")
          } catch (error) {
            console.log("Error",error)
          }
        }

        const uploadStory = async ()=>{
          try {
            const formData = new FormData()
            formData.append("mediaType",mediaType)
            formData.append("media",backendMedia)
            const result = await axios.post(`${serverUrl}/api/story/upload`,formData,{withCredentials:true})
            dispatch(setstoryData([...storyData,result.data]))
            setloading(false)
            navigate("/")
            console.log("Result",result)
          } catch (error) {
            console.log("Error",error)
          }
        }

        const uploadShort = async ()=>{
          try {
            const formData = new FormData()
            formData.append("caption",caption)
            formData.append("media",backendMedia)
            const result = await axios.post(`${serverUrl}/api/short/upload`,formData,{withCredentials:true})
            dispatch(setshortsData([...shortsData,result.data]))
            setloading(false)
            navigate("/")
            console.log("Result",result)
          } catch (error) {
            console.log("Error",error)
          }
        }
        const handleUpload = ()=>{
          setloading(true)
          if(uploadType == "post"){
            uploadPost()
          }else if(uploadType == "story"){
            uploadStory()
          }else{
            uploadShort()
          }
        }
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center">
      <div className="w-full h-20 flex items-center gap-5 px-5 ">
        <MdOutlineArrowBackIos onClick={() => navigate(`/`)}
          className="text-white cursor-pointer w-5 h-5 sm:w-6 sm:h-6"/>
        <h1 className="text-white text-[20px] font-semibold">Upload Media</h1>
      </div>
      <div className="w-[90%] max-w-150 h-20 rounded-full flex justify-around items-center gap-2.5 bg-white" >
        
        <div onClick={()=>setUploadType("post")} className={`${uploadType == "post"?"bg-black shadow-2xl shadow-black text-white ":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black rounded-full`}>Post</div>

        <div onClick={()=>setUploadType("story")} className={`${uploadType == "story"?"bg-black shadow-2xl shadow-black text-white ":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black rounded-full`}>Story</div>

        <div onClick={()=>setUploadType("shorts")} className={`${uploadType == "shorts"?"bg-black shadow-2xl shadow-black text-white ":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black rounded-full`}>Shorts</div>
      </div>
      {!frontendMedia && <div onClick={()=>mediaInput.current.click()} className="w-[80%] max-w-125 h-62.5 bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-2 mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]">
        <input type="file" hidden ref={mediaInput} onChange={handleMedia}/>
        <FiPlusSquare onClick={()=>navigate("/upload")} className='text-white w-6.5 h-6.5 cursor-pointer'/>
            <div className="text-white text-[19px] font-semibold">Upload {uploadType}</div>
      </div>}
      {frontendMedia && 
      <div className="w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center mt-[15vh]">
        {mediaType == "Image" && <div className="w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center mt-[5vh]">
            <img src={frontendMedia} className="h-[60%] rounded-2xl"/>
            {uploadType != "story" && <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" className="w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-1.25 text-white mt-5" placeholder="write caption"/>}
            
            </div>}

            {mediaType == "Video" && <div className="w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center mt-[5vh]">
            <VideoPlayer media={frontendMedia}/>
            {uploadType != "story" && <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" className="w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-1.25 text-white mt-5" placeholder="write caption"/>}
            
            </div>}

        </div>}
        {frontendMedia && <button onClick={handleUpload} className="px-2.5 py-1.25 w-[60%] max-w-100 
        h-12.5 bg-white mt-12.5 cursor-pointer rounded-2xl">
        {loading?<ClipLoader size={30} color="black"/>:`Upload ${uploadType}`} </button>}
    </div>
  );
};

export default Upload;
