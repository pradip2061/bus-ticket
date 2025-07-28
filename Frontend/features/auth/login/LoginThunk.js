import  {createAsyncThunk }from "@reduxjs/toolkit";
import axios from 'axios'

 export const loginThunk = createAsyncThunk('login/loginThunk',async(formData,{dispatch,rejectWithValue})=>{
 try {
   const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/login`,
  { formData },
  {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true // ✅ this must be here, NOT inside headers
  }
);
    if(response.status == 200){
        return response.data
    }
 } catch (error) {
    return rejectWithValue(error.response.data.message)
 }
})