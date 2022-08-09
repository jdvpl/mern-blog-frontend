import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../../config/Axios";

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await clientAxios.post("/users/register", user);
      return data;
    } catch (e) {
      const errorData = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      return rejectWithValue(errorData);
    }
  }
);
