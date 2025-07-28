import  {createAsyncThunk }from "@reduxjs/toolkit";
import axios from 'axios'



export const getpathsoloThunk = createAsyncThunk(
  'getpathsolo/getpathsoloThunk',
  async (busid, { dispatch, rejectWithValue }) => {
    try {
     const response = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/getpathsolo`,
  {
    params: {
      busid: busid, // or just busid if key and value are same
    },
  }
);


      if (response.status === 200) {
        return response.data.businfo
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching paths");
    }
  }
);
