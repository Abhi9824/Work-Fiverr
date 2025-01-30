import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
const api = `${BASE_URL}/users`;
export const signupUser = createAsyncThunk("user/signup", async (userData) => {
  try {
    const response = await axios.post(`${api}/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      const data = response.data;
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      return data.user;
    }
  } catch (error) {
    throw new Error("SignUp Failed:", error);
  }
});

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  try {
    const response = await axios.post(`${api}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = response.data;
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      return data.user;
    }
  } catch (error) {
    throw new Error("Error in Logging in");
  }
});

export const getAllUsersAsync = createAsyncThunk("user/allUser", async () => {
  try {
    const response = await axios.get(`${api}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    throw new Error("Failed to fetch users:", error);
  }
});

export const getUserDetailsAsync = createAsyncThunk(
  "user/userDetails",
  async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.Token is missing");
      }
      const response = await axios.get(`${api}/userDetails/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        return data.user;
      }
    } catch (error) {
      throw new Error("Failed to fetch user details");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    error: null,
    users: [],
    isLoggedIn: false,
    token: localStorage?.getItem("token") || null,
    user: {},
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = {};
      state.isLoggedIn = false;
      state.status = "idle";
      toast.success("Logout Successful");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoggedIn = true;
        state.user = action.payload;
        state.users.push(action.payload);
        toast.success("Signup successful");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.isLoggedIn = true;
        toast.success("Login Successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get All Users
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get User Details
      .addCase(getUserDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserDetailsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getUserDetailsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;
