import { BASE_URL } from "../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const api = `${BASE_URL}/users`;

export const fetchAllTeams = createAsyncThunk("team/fetchAllTeam", async () => {
  try {
    const response = await axios.get(`${api}/team`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      const data = response.data;
      return data.team;
    }
  } catch (error) {
    throw new Error("Failed to fetch teams");
  }
});

export const addTeamAsync = createAsyncThunk(
  "team/addTeam",
  async (teamData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.Token is missing");
      }
      const response = await axios.post(`${api}/team/addTeam`, teamData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response) {
        const data = response.data;
        return data.team;
      }
    } catch (error) {
      throw new Error("Failed to fetch teams");
    }
  }
);

export const updateTeamAsync = createAsyncThunk(
  "team/updateTeam",
  async ({ teamId, dataToUpdate }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated.Token is missing");
      }
      const response = await axios.put(
        `${api}/team/updatedTeam/${teamId}`,
        dataToUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response) {
        const data = response.data;
        return data.team;
      }
    } catch (error) {
      throw new Error("Failed to fetch teams");
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    teamStatus: "idle",
    teamError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTeams.pending, (state) => {
        state.teamStatus = "loading";
      })
      .addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.teamStatus = "success";
        state.teams = action.payload;
      })
      .addCase(fetchAllTeams.rejected, (state, action) => {
        state.teamStatus = "failed";
        state.teamError = action.error.message;
      })
      .addCase(addTeamAsync.fulfilled, (state, action) => {
        state.teams.push(action.payload);
        toast.success("Team added");
      })
      .addCase(updateTeamAsync.pending, (state) => {
        state.teamStatus = "loading";
      })
      .addCase(updateTeamAsync.fulfilled, (state, action) => {
        state.teamStatus = "success";
        const updatedTeam = action.payload;
        const existingIndex = state.teams.findIndex(
          (team) => team._id === updatedTeam._id
        );
        if (existingIndex !== -1) {
          state.teams[existingIndex] = updatedTeam;
        }
        toast.success("Team updated successfully");
      })
      .addCase(updateTeamAsync.rejected, (state, action) => {
        state.teamStatus = "failed";
        state.teamError = action.error.message;
      });
  },
});

export default teamSlice.reducer;
