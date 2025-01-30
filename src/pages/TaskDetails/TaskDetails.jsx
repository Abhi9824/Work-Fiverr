import React from "react";
import "./TaskDetails.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { calculateRemainingDays } from "../../utils/dateFormat";
import { updateTaskAsync, fetchAllTasks } from "../../features/taskSlice";

const TaskDetails = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.user);

  const taskData = tasks?.find((task) => task?._id === taskId);
  const isOwner = taskData?.owners?.some((owner) => owner._id === user._id);

  const handleStatusChange = async () => {
    if (taskData) {
      const updatedTaskData = {
        ...taskData,
        status: "Completed",
      };

      try {
        await dispatch(
          updateTaskAsync({ taskId: taskData._id, taskData: updatedTaskData })
        );
        dispatch(fetchAllTasks());
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    }
  };

  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">Task Details</h2>
          <div className="d-flex justify-content-center flex-column align-items-center py-4">
            <ul className="list-group col-md-6 fs-5">
              <li className="list-group-item">
                Project: {taskData?.project.name}
              </li>
              <li className="list-group-item">
                Team: {taskData?.team.name || ""}
              </li>
              <li className="list-group-item">
                Owners:{" "}
                {taskData?.owners && taskData?.owners.length > 0
                  ? taskData?.owners.map((owner, index) => (
                      <span key={owner._id}>
                        {owner.name}
                        {index < taskData?.owners.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : ""}
              </li>
              <li className="list-group-item">
                Tags:{" "}
                {taskData?.tags && taskData?.tags.length > 0
                  ? taskData?.tags.map((tag, index) => (
                      <span key={tag?._id}>
                        {tag?.name}
                        {index < taskData?.tags.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : ""}
              </li>
              <li className="list-group-item">
                Due Date: {new Date(taskData?.createdAt).toLocaleDateString()}
              </li>
            </ul>

            <div className="py-4 fs-5">
              <p>Status: {taskData?.status}</p>
              <p>
                Time Remaining: {calculateRemainingDays(taskData?.createdAt)}
              </p>
              {taskData?.status !== "Completed" && isOwner && (
                <button
                  className="btn btn-primary"
                  onClick={handleStatusChange}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
