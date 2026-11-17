import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ForgPassword from './pages/ForgPassword'
import { useSelector } from 'react-redux'
import GetcurrentUser from './Hooks/GetcurrentUser'
import GetsuggestedUser from './Hooks/GetsuggestedUser'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import GetAllPost from './Hooks/GetAllPost'
export const serverUrl = "http://localhost:3007"

const App = () => {
  GetcurrentUser()
  GetsuggestedUser()
  GetAllPost()
  const {userData} = useSelector(state=>state.user)
  
  return (
    <Routes>
      
    <Route path='/signup' element={!userData?<Signup/>:<Navigate to ={"/"}/>} />
    <Route path='/login' element={!userData?<Login/>:<Navigate to ={"/"}/>} />
    <Route path='/forgot-password' element={!userData?<ForgPassword/>:<Navigate to ={"/"}/>}/>
    <Route path='/' element={userData ? <Home/> : <Navigate to ={"/login"}/> } />
    <Route path='/profile/:userName' element={userData ? <Profile/> : <Navigate to ={"/login"}/> } />
    <Route path='/editprofile' element={userData ? <EditProfile/> : <Navigate to ={"/login"}/> } />
    <Route path='/upload' element={userData ? <Upload/> : <Navigate to ={"/login"}/> } />
    </Routes>
  )
}

export default App