import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { setpostData } from '../redux/postSlice'

const GetAllPost = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
  useEffect(() => {
    const fetchPost = async ()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/post/getAll`,{withCredentials : true})
            dispatch(setpostData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    fetchPost()
  }, [dispatch,userData])
  
}
export default GetAllPost