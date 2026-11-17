import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name : "post",
    initialState :{
        postData : [],
    },
    reducers : {
        setpostData : (state,action)=>{
            // console.log("hello")
            console.log("reducer userData",state)
            state.postData = action.payload
        },
    }
})
export const {setpostData} = postSlice.actions
export default postSlice.reducer