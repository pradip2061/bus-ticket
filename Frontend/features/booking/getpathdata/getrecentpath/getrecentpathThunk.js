import  {createAsyncThunk }from "@reduxjs/toolkit";
import axios from 'axios'



export const getpathrecentThunk = createAsyncThunk(
  'getpathrecent/getpathrecentThunk',
  async (_, { dispatch, rejectWithValue }) => {
    try {
     const response = await axios.get(
  `${import.meta.env.VITE_BASE_URL}/getrecentpath`
);


      if (response.status === 200) {
        return response.data.recentBuses
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching paths");
    }
  }
);
