import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "../features/projectSlice";
import taskSlice from "../features/taskSlice";
import teamSlice from "../features/teamSlice";
import userSlice from "../features/userSlice";
import tagsSlice from "../features/tagsSlice";

export const store = configureStore({
  reducer: {
    project: projectSlice,
    task: taskSlice,
    team: teamSlice,
    user: userSlice,
    tags: tagsSlice,
  },
});
