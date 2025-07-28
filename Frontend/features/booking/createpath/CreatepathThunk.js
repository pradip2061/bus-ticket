import  {createAsyncThunk }from "@reduxjs/toolkit";
import axios from 'axios'

 export const createpathThunk = createAsyncThunk('createpath/createpathThunk',async(formData,{dispatch,rejectWithValue})=>{
 try {
   const response = await axios.post(
  `${import.meta.env.VITE_BASE_URL}/createpath`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    withCredentials: true // ✅ this must be here, NOT inside headers
  }
);
    if(response.status == 201){
        return response.data.message
    }
 } catch (error) {
    return rejectWithValue(error.response.data.message)
 }
})