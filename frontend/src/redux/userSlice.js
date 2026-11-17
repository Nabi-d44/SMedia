import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState :{
        userData : null,
        suggestedUsers : null,
        profileData : null,
        following : [],
    },
    reducers : {
        setuserData : (state,action)=>{
            // console.log("hello")
            console.log("reducer userData",state)
            state.userData = action.payload
        },
        setsuggestedUsers : (state,action)=>{
            state.suggestedUsers = action.payload
        },
        setprofileData : (state,action)=>{
            console.log("reducer profileData",state)
            state.profileData = action.payload
        },
        setFollowing : (state,action)=>{
            state.following = action.payload
        },
        toggleFollow : (state,action)=>{
            const targetUserId = action.payload
            if(state.following.includes(targetUserId)){
                state.following=state.following.filter(id=>id != targetUserId)
            }else{
                state.following.push(targetUserId)
            }
        }
    }
})
export const {setuserData,setsuggestedUsers,setprofileData,setFollowing,toggleFollow} = userSlice.actions
export default userSlice.reducer