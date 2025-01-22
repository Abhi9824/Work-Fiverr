import { BASE_URL } from "../utils/baseUrl";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const api = `${BASE_URL}/users`;

export const addTagsAsync = createAsyncThunk("tags/addTags", async (tags) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated. Token is missing");
    }
    const response = await axios.post(`${api}/addTags`, tags, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.tags;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add tags");
  }
});

export const tagsByIdAsync = createAsyncThunk(
  "tags/tagsById",
  async (projectId) => {
    try {
      const response = await axios.get(`${api}/projectByTags/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.tags;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch tags by project ID"
      );
    }
  }
);

export const getAllTagsAsync = createAsyncThunk("tags/getAllTags", async () => {
  try {
    const response = await axios.get(`${api}/getTags`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.tags;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch all tags"
    );
  }
});

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    tagsStatus: "idle",
    tagsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTagsAsync.pending, (state) => {
        state.tagsStatus = "loading";
      })
      .addCase(addTagsAsync.fulfilled, (state, action) => {
        state.tagsStatus = "succeeded";
        state.tags.push(action.payload);
      })
      .addCase(addTagsAsync.rejected, (state, action) => {
        state.tagsStatus = "failed";
        state.tagsError = action.error.message;
      })
      .addCase(tagsByIdAsync.pending, (state) => {
        state.tagsStatus = "loading";
      })
      .addCase(tagsByIdAsync.fulfilled, (state, action) => {
        state.tagsStatus = "succeeded";
        state.tags = action.payload;
      })
      .addCase(tagsByIdAsync.rejected, (state, action) => {
        state.tagsStatus = "failed";
        state.tagsError = action.error.message;
      })
      .addCase(getAllTagsAsync.pending, (state) => {
        state.tagsStatus = "loading";
      })
      .addCase(getAllTagsAsync.fulfilled, (state, action) => {
        state.tagsStatus = "succeeded";
        state.tags = action.payload;
      })
      .addCase(getAllTagsAsync.rejected, (state, action) => {
        state.tagsStatus = "failed";
        state.tagsError = action.error.message;
      });
  },
});

export default tagsSlice.reducer;
