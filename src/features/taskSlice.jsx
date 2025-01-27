import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/baseUrl";

const api = `${BASE_URL}/users`;

export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async () => {
    try {
      const response = await axios.get(`${api}/task/getAllTasks`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const data = response.data;
        console.log("fetchAllTasks", data.task);

        return data.task;
      }
    } catch (error) {
      throw new Error("Failed to fetch all tasks");
    }
  }
);

export const fetchTasksAsync = createAsyncThunk("tasks/fetchAll", async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is missing");

  const response = await axios.get(`${api}/task/taskById`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (response) {
    console.log("fetchTaskById", response.data.task);

    return response.data.task;
  }
});

export const addTaskAsync = createAsyncThunk("tasks/add", async (taskData) => {
  try {
    console.log("asyndata", taskData);
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token is missing");

    const response = await axios.post(`${api}/task/addTasks`, taskData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (response.status === 200) {
      const data = response.data;
      return data.task;
    }
  } catch (error) {
    throw new Error("Failed to add tasks.");
  }
});

export const updateTaskAsync = createAsyncThunk(
  "tasks/update",
  async ({ taskId, taskData }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      const response = await axios.put(
        `${api}/task/updateTask/${taskId}`,
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log("updateed data", data.task);
        return data.task;
      }
    } catch (error) {
      throw new Error("Failed to updated the task.");
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/delete",
  async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      const response = await axios.delete(`${api}/deleteTask/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        return data.taskId;
      }
    } catch (error) {
      throw new Error("Failed to delete the Task", error);
    }
  }
);
export const filteredTaskAsync = createAsyncThunk(
  "tasks/filteredTask",
  async (filter) => {
    console.log("filter", filter);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      const response = await axios.get(`${api}/tasks`, {
        params: filter,

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response) {
        const data = response.data;
        console.log(response);
        console.log("filtr", data);
        return data;
      }
    } catch (error) {
      throw new Error("Failed to fetch the Task", error);
    }
  }
);

export const fetchLastWeekReport = createAsyncThunk(
  "tasks/fetchLastWeekReport",
  async () => {
    try {
      const response = await axios.get(`${api}/report/last-week`);
      if (response.status === 200) {
        console.log("last-week", response.data);
        return response.data.report;
      }
    } catch (error) {
      throw new Error("Failed to fetch last week's report");
    }
  }
);

// Fetch pending tasks report
export const fetchPendingTasksReport = createAsyncThunk(
  "tasks/fetchPendingTasksReport",
  async () => {
    try {
      const response = await axios.get(`${api}/report/pending`);
      if (response.status === 200) {
        console.log("pending", response.data);

        return response.data.report.data;
      }
    } catch (error) {
      throw new Error("Failed to fetch pending tasks report");
    }
  }
);

// Fetch closed tasks report
export const fetchClosedTasksReport = createAsyncThunk(
  "tasks/fetchClosedTasksReport",
  async (groupBy) => {
    try {
      const response = await axios.get(`${api}/report/closed`, {
        params: { groupBy },
      });
      if (response.status === 200) {
        return { groupBy, data: response.data.report.data };
      }
    } catch (error) {
      throw new Error("Failed to fetch closed tasks report");
    }
  }
);

// Task Slice
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    taskStatus: "idle",
    taskError: null,
    lastWeekReport: [],
    pendingTasksReport: [],
    closedTasksReport: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.taskStatus = "success";
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      })
      .addCase(fetchTasksAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.taskStatus = "success";
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      })

      // Add task
      .addCase(addTaskAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.taskStatus = "success";
        // state.tasks = action.payload;
        state.tasks.push(action.payload);
        toast.success("Task added successfully!");
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      })

      // Update task
      .addCase(updateTaskAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.taskStatus = "success";
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload; // Replace with updated task
        }
        toast.success("Task updated successfully!");
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      })

      // Delete task
      .addCase(deleteTaskAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.taskStatus = "success";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        toast.success("Task deleted successfully!");
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      })
      //query Task
      .addCase(filteredTaskAsync.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(filteredTaskAsync.fulfilled, (state, action) => {
        state.taskStatus = "success";
        state.tasks = action.payload;
      })
      .addCase(filteredTaskAsync.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.payload?.error || "Something went wrong.";
      })
      // Fetch last week tasks report
      .addCase(fetchLastWeekReport.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(fetchLastWeekReport.fulfilled, (state, action) => {
        state.taskStatus = "success";
        state.lastWeekReport = action.payload;
      })
      .addCase(fetchLastWeekReport.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      })

      // Fetch pending tasks report
      .addCase(fetchPendingTasksReport.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(fetchPendingTasksReport.fulfilled, (state, action) => {
        state.taskStatus = "success";
        state.pendingTasksReport = action.payload;
      })
      .addCase(fetchPendingTasksReport.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      })

      // Fetch closed tasks report
      .addCase(fetchClosedTasksReport.pending, (state) => {
        state.taskStatus = "loading";
      })
      .addCase(fetchClosedTasksReport.fulfilled, (state, action) => {
        state.taskStatus = "success";
        // state.closedTasksReport = action.payload;
        const { groupBy, data } = action.payload;
        if (groupBy === "project") {
          state.projectClosedTasks = action.payload.data;
        } else if (groupBy === "owner") {
          state.ownerClosedTasks = action.payload.data;
        } else if (groupBy === "team") {
          state.teamClosedTasks = action.payload.data;
        }
      })
      .addCase(fetchClosedTasksReport.rejected, (state, action) => {
        state.taskStatus = "failed";
        state.taskError = action.error.message;
      });
  },
});

export default taskSlice.reducer;
