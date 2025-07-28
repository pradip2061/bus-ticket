import  {createAsyncThunk }from "@reduxjs/toolkit";
import axios from 'axios'
 export const signupThunk = createAsyncThunk('singup/signupThunk',async(formData,{dispatch,rejectWithValue})=>{
 try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`,{formData},{
        headers:{
            "Content-Type":'application/json'
        }
    })
    if(response.status == 200){
        return response.data.message
    }
 } catch (error) {
    return rejectWithValue(error.response.data.message)
 }
})