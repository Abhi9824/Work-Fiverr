import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import {
  addTaskAsync,
  deleteTaskAsync,
  fetchAllTasks,
  fetchTasksAsync,
  updateTaskAsync,
} from "../../features/taskSlice";
import { fetchAllTeams } from "../../features/teamSlice";

const Task = () => {
  const dispatch = useDispatch();
  const { tasks, taskStatus } = useSelector((state) => state?.task);
  const { projects, projectStatus } = useSelector((state) => state?.project);
  const { teams, teamStatus } = useSelector((state) => state?.team);
  const { users, status, user } = useSelector((state) => state?.user);
  const { tags } = useSelector((state) => state?.tags);
  const [taskModal, setTaskModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [owners, setOwners] = useState([]);
  const [tag, setTag] = useState([]);
  const [due, setDue] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");
  const [stats, setStats] = useState("To Do");
  const [project, setProject] = useState("");

  //edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTeamName, setEditTeamName] = useState("");
  const [editOwners, setEditOwners] = useState([]);
  const [editTag, setEditTag] = useState([]);
  const [editDue, setEditDue] = useState("");
  const [editTimeToComplete, setEditTimeToComplete] = useState("");
  const [editStats, setEditStats] = useState("To Do");
  const [editProject, setEditProject] = useState("");

  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };
  //debug team
  const handleTeamChange = (e) => {
    const selectedTeam = teams.find((team) => team._id === e.target.value);
    // await setEditTeamName(selectedTeam); // Now we store the team
    setTeamName(selectedTeam);
    // object with its ID
    console.log("Selected Team ID:", selectedTeam._id); // Log the selected team ID
  };

  //editTeamName
  const handleEditTeamChange = (e) => {
    const selectedTeam = teams.find((team) => team._id === e.target.value);
    setEditTeamName(selectedTeam); // Now we store the team
    console.log("Selected Team ID:", selectedTeam._id); // Log the
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const taskSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      !taskName ||
      !project ||
      !teamName ||
      !owners.length ||
      !due ||
      !timeToComplete ||
      !stats ||
      !tag
    ) {
      console.log("Missing required fields");
      return; // Exit early if any field is missing
    }
    const taskData = {
      name: taskName,
      project: project,
      team: teamName._id,
      owners: owners,
      tags: tag,
      createdAt: new Date(due).toISOString(),
      timeToComplete: Number(timeToComplete),
      status: stats,
    };
    try {
      // Wait for the task to be added before fetching all tasks
      await dispatch(addTaskAsync(taskData)).unwrap();
      dispatch(fetchAllTasks()); // Fetch updated tasks
      toggleTaskModal(); // Close modal after task is added
      setTaskName("");
      setTeamName([]);
      setOwners([]);
      setTag([]);
      setDue("");
      setTimeToComplete("");
      setStats("To Do");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    await dispatch(deleteTaskAsync(taskId));
    dispatch(fetchAllTasks());
  };

  const handleEdit = (taskId) => {
    const selectedTask = tasks?.find((task) => task._id === taskId);
    if (selectedTask) {
      setEditTaskName(selectedTask.name);
      setEditProject(selectedTask.project?._id || "");
      setEditTeamName(selectedTask.team);
      setEditOwners(selectedTask.owners?.map((owner) => owner._id) || []);
      setEditTag(selectedTask.tags?.map((tag) => tag._id) || []);
      // setEditDue(selectedTask.createdAt);
      setEditDue(new Date(selectedTask.createdAt).toISOString().split("T")[0]);
      setEditTimeToComplete(selectedTask.timeToComplete || "");
      setEditStats(selectedTask.status || "To Do");
      setEditingTaskId(taskId);
      toggleEditModal();
    }
  };
  const taskEditSubmitHandler = async (e) => {
    e.preventDefault();
    if (editingTaskId) {
      const updatedTaskData = {
        name: editTaskName,
        project: editProject,
        team: editTeamName._id,
        owners: editOwners,
        tags: editTag,
        createdAt: new Date(editDue).toISOString(),
        timeToComplete: Number(editTimeToComplete),
        status: editStats,
      };

      try {
        await dispatch(
          updateTaskAsync({ taskId: editingTaskId, taskData: updatedTaskData })
        ).unwrap();
        await dispatch(fetchAllTasks()).unwrap();

        toggleEditModal();
        setEditingTaskId(null);
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }
  };
  //side effects
  useEffect(() => {
    dispatch(fetchAllTeams());

    dispatch(fetchAllTasks());
  }, []);

  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">Task Dashboard</h2>
          <div className="content-desc d-flex row py-3 col-md-12">
            {tasks?.map((task) => {
              return (
                <div className="col-md-4 mb-3" key={task?._id}>
                  <div className="card mb-3">
                    <div className="card-body d-flex justify-content-between">
                      <div>
                        <Link
                          to={`/taskDetails/${task?._id}`}
                          className="card-link"
                        >
                          <h5>{task?.name}</h5>
                          <p className="fw-light">{task?.team?.name}</p>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between mt-3 gap-2">
                        {task?.owners?.some((o) => o._id === user?._id) && (
                          <>
                            <div>
                              <button
                                onClick={() => handleEdit(task?._id)}
                                className="editBtn"
                              >
                                <BiEdit className="icon" />
                              </button>
                            </div>
                            <div>
                              <button
                                className="editBtn"
                                onClick={() => handleDelete(task?._id)}
                              >
                                <MdDeleteOutline className="icon" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <button onClick={toggleTaskModal} className="addProjectBtn">
              Add New Task
            </button>
          </div>
        </div>
      </div>

      {taskModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleTaskModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={taskSubmitHandler}>
                  <div className="pb-2">
                    <label>Task Name:</label>
                    <input
                      type="text"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      name="taskName"
                      className="form-control"
                      placeholder="Write Task Name"
                    />
                  </div>
                  <div className="pb-2">
                    <label htmlFor="projects">Project:</label>
                    <select
                      name="project"
                      id="project"
                      onChange={(e) => setProject(e.target.value)}
                      className="form-select"
                      value={project}
                    >
                      {projects?.map((proj) => {
                        return (
                          <>
                            <option value={proj._id} key={proj._id}>
                              {proj.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="pb-2">
                    <label>Team:</label>
                    <select
                      name="team"
                      id="team"
                      // onChange={(e) => setTeamName(e.target.value)}
                      onChange={(e) => handleTeamChange(e)}
                      className="form-select"
                      value={teamName?._id}
                    >
                      {teams?.map((team) => {
                        return (
                          <>
                            <option value={team._id} key={team._id}>
                              {team.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="pb-2">
                    <label>Owners:</label>
                    <div>
                      {users?.map((user) => (
                        <div
                          key={user._id}
                          className="form-check form-check-inline"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`owner-${user._id}`}
                            value={user._id}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              if (isChecked) {
                                setOwners((prevOwners) => [
                                  ...prevOwners,
                                  user._id,
                                ]);
                              } else {
                                setOwners((prevOwners) =>
                                  prevOwners.filter(
                                    (ownerId) => ownerId !== user._id
                                  )
                                );
                              }
                            }}
                            checked={owners.includes(user._id)}
                          />
                          <label
                            htmlFor={`owner-${user._id}`}
                            className="form-check-label"
                          >
                            {user.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pb-2">
                    <label>Tags:</label>
                    <div>
                      {tags?.map((tagItem) => (
                        <div
                          key={tagItem._id}
                          className="form-check form-check-inline"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`tag-${tagItem._id}`}
                            value={tagItem._id}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              if (isChecked) {
                                setTag((prevTags) => [
                                  ...prevTags,
                                  tagItem._id,
                                ]); // Add selected tag ID
                              } else {
                                setTag(
                                  (prevTags) =>
                                    prevTags.filter(
                                      (tagId) => tagId !== tagItem._id
                                    ) // Remove unselected tag ID
                                );
                              }
                            }}
                            checked={tag.includes(tagItem._id)} // Check against local `tag` state
                          />
                          <label
                            htmlFor={`tag-${tagItem._id}`}
                            className="form-check-label"
                          >
                            {tagItem.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pb-2">
                    <label>Due Date:</label>
                    <input
                      type="date"
                      value={due}
                      onChange={(e) => setDue(e.target.value)}
                      name="due"
                      className="form-control"
                    />
                  </div>
                  <div className="pb-2">
                    <label>Time (Days):</label>
                    <input
                      type="number"
                      value={timeToComplete}
                      onChange={(e) => setTimeToComplete(e.target.value)}
                      name="timeToComplete"
                      className="form-control"
                    />
                  </div>
                  <div className="pb-2">
                    <label>Status: </label>
                    <select
                      value={stats}
                      onChange={(e) => setStats(e.target.value)}
                      className="form-control"
                      name="stats"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <button type="submit" className="submitBtn mt-2 form-control">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleEditModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={taskEditSubmitHandler}>
                  <div className="pb-2">
                    <label>Task Name:</label>
                    <input
                      type="text"
                      value={editTaskName}
                      onChange={(e) => setEditTaskName(e.target.value)}
                      name="taskName"
                      className="form-control"
                      placeholder="Write Task Name"
                    />
                  </div>
                  <div className="pb-2">
                    <label htmlFor="projects">Project:</label>
                    <select
                      name="project"
                      id="project"
                      onChange={(e) => setEditProject(e.target.value)}
                      className="form-select"
                      value={editProject}
                    >
                      {projects?.map((proj) => {
                        return (
                          <>
                            <option value={proj._id} key={proj._id}>
                              {proj.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="pb-2">
                    <label>Team:</label>
                    <select
                      name="team"
                      id="team"
                      // onChange={(e) => setTeamName(e.target.value)}
                      onChange={(e) => handleEditTeamChange(e)}
                      className="form-select"
                      value={editTeamName?._id}
                    >
                      {teams?.map((team) => {
                        return (
                          <>
                            <option value={team._id} key={team._id}>
                              {team.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>

                  <div className="pb-2">
                    <label>Owners:</label>
                    <div>
                      {users?.map((user) => (
                        <div
                          key={user._id}
                          className="form-check form-check-inline"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`owner-${user?._id}`}
                            value={user?._id}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              if (isChecked) {
                                setEditOwners((prevOwners) => [
                                  ...prevOwners,
                                  user?._id,
                                ]);
                              } else {
                                setEditOwners((prevOwners) =>
                                  prevOwners.filter(
                                    (ownerId) => ownerId !== user._id
                                  )
                                );
                              }
                            }}
                            checked={editOwners?.includes(user._id)}
                          />
                          <label
                            htmlFor={`owner-${user._id}`}
                            className="form-check-label"
                          >
                            {user.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pb-2">
                    <label>Tags:</label>
                    <div>
                      {tags?.map((tagItem) => (
                        <div
                          key={tagItem._id}
                          className="form-check form-check-inline"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`tag-${tagItem._id}`}
                            value={tagItem._id}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              if (isChecked) {
                                setEditTag((prevTags) => [
                                  ...prevTags,
                                  tagItem._id,
                                ]); // Add selected tag ID
                              } else {
                                setEditTag(
                                  (prevTags) =>
                                    prevTags.filter(
                                      (tagId) => tagId !== tagItem._id
                                    ) // Remove unselected tag ID
                                );
                              }
                            }}
                            checked={editTag?.includes(tagItem._id)} // Check against local `tag` state
                          />
                          <label
                            htmlFor={`tag-${tagItem._id}`}
                            className="form-check-label"
                          >
                            {tagItem.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pb-2">
                    <label>Due Date:</label>
                    <input
                      type="date"
                      value={editDue}
                      onChange={(e) => setEditDue(e.target.value)}
                      name="due"
                      className="form-control"
                    />
                  </div>
                  <div className="pb-2">
                    <label>Time (Days):</label>
                    <input
                      type="number"
                      value={editTimeToComplete}
                      onChange={(e) => setEditTimeToComplete(e.target.value)}
                      name="timeToComplete"
                      className="form-control"
                    />
                  </div>
                  <div className="pb-2">
                    <label>Status: </label>
                    <select
                      value={editStats}
                      onChange={(e) => setEditStats(e.target.value)}
                      className="form-control"
                      name="stats"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <button type="submit" className="submitBtn mt-2 form-control">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
