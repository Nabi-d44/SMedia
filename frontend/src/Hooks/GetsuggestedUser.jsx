import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setsuggestedUsers, setuserData } from '../redux/userSlice'
import axios from "axios"

const GetsuggestedUser = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
  useEffect(() => {
    const fetchUser = async ()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/suggested`,{withCredentials : true})
            dispatch(setsuggestedUsers(result.data))
            console.log("SuggestedUsers",result.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchUser()
  }, [userData])
  
}
export default GetsuggestedUser