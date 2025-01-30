import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTasks,
  fetchClosedTasksReport,
  fetchLastWeekReport,
  fetchPendingTasksReport,
} from "../../features/taskSlice";
import ClosedTasksChart from "../../components/Chart/ClosedTasksChart ";
import Sidebar from "../../components/Sidebar/Sidebar";
import LastweekChart from "../../components/Chart/LastweekChart";
import PendingTaskReport from "../../components/Chart/PendingTaskReport";

const TaskReport = () => {
  const dispatch = useDispatch();
  const {
    projectClosedTasks,
    ownerClosedTasks,
    teamClosedTasks,
    pendingTasksReport,
    lastWeekReport,
  } = useSelector((state) => state.task);
  // State for managing which group is selected
  const [selectedGroup, setSelectedGroup] = useState("project");

  // choosing the data based on selected group
  let dataToDisplay = [];
  let chartTitle = "";
  if (selectedGroup === "project") {
    dataToDisplay = projectClosedTasks;
    chartTitle = "Closed Tasks by Project";
  } else if (selectedGroup === "owner") {
    dataToDisplay = ownerClosedTasks;
    chartTitle = "Closed Tasks by Owner";
  } else if (selectedGroup === "team") {
    dataToDisplay = teamClosedTasks;
    chartTitle = "Closed Tasks by Team";
  }

  useEffect(() => {
    dispatch(fetchAllTasks());
    dispatch(fetchLastWeekReport());
    dispatch(fetchPendingTasksReport());
    dispatch(fetchClosedTasksReport("project"));
    dispatch(fetchClosedTasksReport("owner"));
    dispatch(fetchClosedTasksReport("team"));
  }, []);

  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">Reports</h2>
          <div className="container-fluid">
            <div className="row py-2">
              {/* task Completed last-week */}

              <div className="col-12 d-flex flex-column justify-content-center align-items-center py-4">
                <h4>Task Completed Last-Week</h4>
                <LastweekChart data={lastWeekReport} />
              </div>

              {/* task pending days */}

              <div className="col-md-12 d-flex flex-column justify-content-center align-items-center py-4">
                <h4>Total Days of Work Pending </h4>
                <PendingTaskReport data={pendingTasksReport} />
              </div>

              {/* closed task */}
              <div className="col-md-12 d-flex flex-column justify-content-center align-items-center py-4">
                <h4>Closed Tasks Report</h4>
                {/* Buttons to toggle between project, owner, and team */}
                <div className="py-4">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => setSelectedGroup("project")}
                  >
                    By Project
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => setSelectedGroup("owner")}
                  >
                    By Owner
                  </button>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => setSelectedGroup("team")}
                  >
                    By Team
                  </button>
                </div>
                {/* Pass data and chart title dynamically */}
                <ClosedTasksChart
                  data={dataToDisplay}
                  chartTitle={chartTitle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskReport;
