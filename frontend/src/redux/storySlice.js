import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
    name : "story",
    initialState :{
        storyData : [],
    },
    reducers : {
        setstoryData : (state,action)=>{
            state.storyData = action.payload
        },
    }
})
export const {setstoryData} = storySlice.actions
export default storySlice.reducer