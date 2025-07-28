import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./LoginThunk";
const login = createSlice({
name:'login',
initialState:{
    error:"",
    status:null,
    message:"",
    role:""
},
reducers:{
    resetdataLogin:(state)=>{
        state.error=""
          state.status=null
            state.message=""
    },
    setRole:(state,action)=>{
        state.role=action.payload
    }
},
extraReducers:(builder)=>{
builder.addCase(loginThunk.pending,(state,action)=>{
state.error="",
state.status = 'pending',
state.message = "",
state.role=""
}).addCase(loginThunk.fulfilled,(state,action)=>{
state.error="",
state.status = 'success',
state.message = action.payload.message,
state.role=action.payload.role
localStorage.setItem('isLogin', 'true');
localStorage.setItem('role',action.payload.role)
}).addCase(loginThunk.rejected,(state,action)=>{
state.error= action.payload,
state.status = 'failed',
state.message = ""
localStorage.removeItem('isLogin');
})
}
})

export const {resetdataLogin,setRole} = login.actions
export default login.reducer