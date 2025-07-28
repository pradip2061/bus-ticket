import { createSlice } from "@reduxjs/toolkit";
import { createpathThunk } from "./CreatepathThunk";
const createpath = createSlice({
name:'createpath',
initialState:{
    error:"",
    status:null,
    message:"",
},
reducers:{
    refreshdata:(state)=>{
        state.status=null,
        state.message=""
    }
},
extraReducers:(builder)=>{
builder.addCase(createpathThunk.pending,(state,action)=>{
state.error="",
state.status = 'pending',
state.message = ""
}).addCase(createpathThunk.fulfilled,(state,action)=>{
state.error="",
state.status = 'success',
state.message = action.payload
}).addCase(createpathThunk.rejected,(state,action)=>{
state.error= action.payload,
state.status = 'failed',
state.message = ""
})
}
})

export const {refreshdata}=createpath.actions
export default createpath.reducer