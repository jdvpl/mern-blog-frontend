import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../../config/Axios";

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await clientAxios.post("/users/register", user);
      return data;
    } catch (e) {
      console.log(e.response);
      const errorData = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      return rejectWithValue(errorData);
    }
  }
);

// slices
const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: "login",
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload;
      state.serverErr = action?.payload;
    });
  },
});

export default userSlices.reducer;
