import { createSlice } from "@reduxjs/toolkit";

const shortsSlice = createSlice({
    name : "shorts",
    initialState :{
        shortsData : [],
    },
    reducers : {
        setshortsData : (state,action)=>{
            state.shortsData = action.payload
        },
    }
})
export const {setshortsData} = shortsSlice.actions
export default shortsSlice.reducer