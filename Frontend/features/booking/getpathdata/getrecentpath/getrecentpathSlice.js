import { createSlice } from "@reduxjs/toolkit";
import { getpathrecentThunk } from "./getrecentpathThunk";


const getpathrecent = createSlice({
name:'getpathrecent',
initialState:{
    error:"",
    status:null,
    message:"",
    paths:[],
},
reducers:{
    resetrecentStatus:(state)=>{
        state.status = null,
        state.error="",
        state.message=""
    },
},
extraReducers:(builder)=>{
builder.addCase(getpathrecentThunk.pending,(state,action)=>{
state.error="",
state.status = 'pending',
state.message = "",
state.paths=[],
state.userid=""
}).addCase(getpathrecentThunk.fulfilled,(state,action)=>{
state.error="",
state.status = 'success',
state.paths = action.payload
state.message="successfully"
}).addCase(getpathrecentThunk.rejected,(state,action)=>{
state.error= action.payload,
state.status = 'failed',
state.message = ""
})
}
})

export const{resetrecentStatus} =getpathrecent.actions
export default getpathrecent.reducer