import { createSlice } from "@reduxjs/toolkit";
import { getpathsoloThunk } from "./getpathsoloThunk";


const getpathsolo = createSlice({
name:'getpathsolo',
initialState:{
    error:"",
    status:null,
    message:"",
    paths:[],
},
reducers:{
    resetsoloStatus:(state)=>{
        state.status = null,
        state.error="",
        state.message=""
    },
},
extraReducers:(builder)=>{
builder.addCase(getpathsoloThunk.pending,(state,action)=>{
state.error="",
state.status = 'pending',
state.message = "",
state.paths=[],
state.userid=""
}).addCase(getpathsoloThunk.fulfilled,(state,action)=>{
state.error="",
state.status = 'success',
state.paths = action.payload
state.message="successfully"
}).addCase(getpathsoloThunk.rejected,(state,action)=>{
state.error= action.payload,
state.status = 'failed',
state.message = ""
})
}
})

export const{resetsoloStatus} =getpathsolo.actions
export default getpathsolo.reducer