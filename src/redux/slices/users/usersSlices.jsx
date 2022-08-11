import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import clientAxios from "../../../config/Axios";
import { decryptData, encryptData } from "../../../functions/EncryptDecrypt";

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
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await clientAxios.post("/users/login", userData);
      const tokenEncrypted = encryptData(data.token);
      // setting data into cookies
      const dataEncrypted = encryptData(data);
      Cookies.set("userssid", JSON.stringify(dataEncrypted));
      Cookies.set("userid", JSON.stringify(tokenEncrypted));
      return data;
    } catch (e) {
      const errorData = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      return rejectWithValue(errorData);
    }
  }
);
export const logoutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      Cookies.remove("userssid");
      Cookies.remove("userid");
    } catch (e) {
      const errorData = e.response.data.errors
        ? e.response.data.errors[0].msg
        : e.response.data.msg;
      return rejectWithValue(errorData);
    }
  }
);

// get the user from cookies
const userInfo = Cookies.get("userssid")
  ? decryptData(JSON.parse(Cookies.get("userssid")))
  : null;
// slices
const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userInfo,
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
    // login user
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload;
      state.serverErr = action?.payload;
    });
    // logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload;
      state.serverErr = action?.payload;
    });
  },
});

export default userSlices.reducer;
