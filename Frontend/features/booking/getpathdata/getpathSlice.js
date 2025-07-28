import { createSlice } from "@reduxjs/toolkit";
import { getpathThunk } from "./getpathThunk";


const getpath = createSlice({
name:'getpath',
initialState:{
    error:"",
    status:null,
    message:"",
    paths:[],
    userid:""
},
reducers:{
    resetStatus:(state)=>{
        state.status = null,
        state.error="",
        state.message=""
    },
    setuserid:(state,action)=>{
        state.userid = action.payload
    }
},
extraReducers:(builder)=>{
builder.addCase(getpathThunk.pending,(state,action)=>{
state.error="",
state.status = 'pending',
state.message = "",
state.paths=[],
state.userid=""
}).addCase(getpathThunk.fulfilled,(state,action)=>{
state.error="",
state.status = 'success',
state.paths = action.payload
state.message="successfully"
}).addCase(getpathThunk.rejected,(state,action)=>{
state.error= action.payload,
state.status = 'failed',
state.message = ""
})
}
})

export const{resetStatus,setuserid} =getpath.actions
export default getpath.reducer