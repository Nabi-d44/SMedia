import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import axios from 'axios'
import { toggleFollow } from '../redux/userSlice'

const FollowButton = ({targetUserId,tailwind,onFollowChange}) => {
    const {following} = useSelector(state=>state.user)
    const isFollowing = following.includes(targetUserId)
    const dispatch = useDispatch()
    const handleFollow = async ()=>{
        try {
            const result = await axios.post(`${serverUrl}/api/user/follow/${targetUserId}`,{},{withCredentials : true})
            if(onFollowChange){
                onFollowChange()
            }
            dispatch(toggleFollow(targetUserId))
        } catch (error) {
            console.log("Error",error)
        }
    }
  return (
    <button onClick={handleFollow} className={tailwind}>
        {isFollowing?"Following":"Follow"}
    </button>
  )
}

export default FollowButton