import { BASE_URL } from "../utils/baseUrl";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const api = `${BASE_URL}/users`;

export const fetchAllProjects = createAsyncThunk(
  "project/fetchAllProject",
  async () => {
    try {
      const response = await axios.get(`${api}/project/getAllProjects`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("fetchALlProject", data);
        return data.project;
      }
    } catch (error) {
      throw new Error("Failed to fetch Project");
    }
  }
);

export const addProjectAsync = createAsyncThunk(
  "project/addProject",
  async (projectData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.Token is missing");
      }
      console.log("projectadta", projectData);
      const response = await axios.post(
        `${api}/project/addProject`,
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log("data", data);

        return data.project;
      }
    } catch (error) {
      throw new Error("Failed to add Project");
    }
  }
);

export const updateProjectAsync = createAsyncThunk(
  "project/updateProject",
  async ({ projectId, projectData }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.Token is missing");
      }
      const response = await axios.put(
        `${api}/project/updateproject/${projectId}`,
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        return data.project;
      }
    } catch (error) {
      throw new Error("Failed to add Project");
    }
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "project/deleteProject",
  async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.Token is missing");
      }
      const response = await axios.delete(
        `${api}/project/updateproject/${projectId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        return data.project;
      }
    } catch (error) {
      throw new Error("Failed to add Project");
    }
  }
);

export const projectByIdAsync = createAsyncThunk(
  "project/getProjects",
  async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "User is not authenticated to add to bookmark.Token is missing"
        );
      }

      const response = await axios.get(`${api}/project/getProject`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return data.project;
      }
    } catch (error) {
      throw new Error("Failed to fetch projects");
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    projectStatus: "idle",
    projectError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.status = "success";
        state.projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addProjectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.projects.push(action.payload);
        toast.success("Added Project");
      })
      .addCase(addProjectAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProjectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProjectAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProjectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload._id
        );
      })
      .addCase(deleteProjectAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(projectByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(projectByIdAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.projects = action.payload;
      })
      .addCase(projectByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
