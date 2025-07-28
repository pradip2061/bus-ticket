import  {createAsyncThunk }from "@reduxjs/toolkit";
import axios from 'axios'
import { setuserid } from "./getpathSlice";



export const getpathThunk = createAsyncThunk(
  'getpath/getpathThunk',
  async (pathdata, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getpath`,
        {
          params: pathdata,
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { paths, userid } = response.data;
        dispatch(setuserid(userid));       // set userid to redux
        return paths;                      // only return paths to be stored in paths slice
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching paths");
    }
  }
);
