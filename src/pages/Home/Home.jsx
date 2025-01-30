import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectAsync } from "../../features/projectSlice";
import {
  addProjectAsync,
  deleteProjectAsync,
  fetchAllProjects,
} from "../../features/projectSlice";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import {
  addTaskAsync,
  fetchAllTasks,
  fetchTasksAsync,
} from "../../features/taskSlice";
import { fetchAllTeams } from "../../features/teamSlice";
import { getAllUsersAsync } from "../../features/userSlice";
import { getAllTagsAsync } from "../../features/tagsSlice";
const { calculateDueDate } = require("../../utils/dateFormat");

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { projects, projectStatus } = useSelector((state) => state.project);
  const { tasks, taskStatus } = useSelector((state) => state.task);
  const { user, status, users, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const { teams, teamStatus } = useSelector((state) => state.team);
  const { tags, tagsStatus } = useSelector((state) => state.tags);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //task modal state
  const [taskModal, setTaskModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [owners, setOwners] = useState([]);
  const [tag, setTag] = useState([]);
  const [due, setDue] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");
  const [stats, setStats] = useState("To Do");
  const [project, setProject] = useState("");

  //Edit and delete states
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleModal = () => {
    setShowProjectModal(!showProjectModal);
  };

  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const projectSubmitHandler = async (e) => {
    e.preventDefault();
    const projectData = {
      name: name,
      description: description,
    };
    await dispatch(addProjectAsync(projectData)).then(() => {
      toggleModal();
      setDescription("");
      setName("");
    });
  };

  const handleTeamChange = async (e) => {
    const selectedTeam = teams.find((team) => team._id === e.target.value);
    await setTeamName(selectedTeam);
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
      return;
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
    await dispatch(addTaskAsync(taskData))
      .then(dispatch(fetchTasksAsync()))
      .then(() => {
        toggleTaskModal();
        setTaskName("");
        setTeamName([]);
        setOwners([]);
        setTag([]);
        setDue("");
        setTimeToComplete("");
        setStats("To Do");
      });
  };

  const handleEdit = (projectId) => {
    const selectedProject = projects.find(
      (project) => project._id === projectId
    );
    if (selectedProject) {
      setEditName(selectedProject.name);
      setEditDescription(selectedProject.description);
      setEditingProjectId(projectId);
      toggleEditModal();
    }
  };

  const editProjectSubmitHandler = async (e) => {
    e.preventDefault();
    if (editingProjectId) {
      const updatedProject = { name: editName, description: editDescription };
      await dispatch(
        updateProjectAsync({
          projectId: editingProjectId,
          projectData: updatedProject,
        })
      )
        .then(() => {
          toggleEditModal();
          setEditName("");
          setEditDescription("");
          setEditingProjectId(null);
        })
        .then(() => dispatch(fetchAllProjects()));
    }
  };

  const handleDelete = (projectId) => {
    dispatch(deleteProjectAsync(projectId));
  };

  useEffect(() => {
    dispatch(fetchAllProjects());
    dispatch(fetchAllTeams());
    dispatch(fetchTasksAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(getAllUsersAsync());
    }
    if (tagsStatus === "idle") {
      dispatch(getAllTagsAsync());
    }
  }, [dispatch, users, tags, user]);
  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">Dashboard</h2>
          <div className="content-desc d-flex row py-3 col-md-12">
            {projects?.map((project) => {
              const createdById =
                typeof project?.createdBy === "object"
                  ? project?.createdBy?._id
                  : project?.createdBy;

              console.log("project createdBy:", createdById);
              console.log("User ID:", user?._id);
              console.log(
                "Comparison result:",
                String(createdById) === String(user?._id)
              );
              return (
                <div className="col-md-4 mb-3" key={project?._id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <Link
                        to={`/projectDetails/${project?._id}`}
                        className="card-link"
                        state={project?.name}
                      >
                        <h5>{project?.name}</h5>
                        <p className="fw-light">{project?.description}</p>
                      </Link>
                      <div className="d-flex justify-content-between mt-3 gap-2">
                        {isLoggedIn &&
                          String(createdById) === String(user?._id) && (
                            <>
                              <div>
                                <button
                                  onClick={() => handleEdit(project?._id)}
                                  className="editBtn"
                                >
                                  <BiEdit className="icon" />
                                </button>
                              </div>
                              <div>
                                <button
                                  className="editBtn"
                                  onClick={() => handleDelete(project?._id)}
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
            <button onClick={toggleModal} className="addProjectBtn">
              Add New Project
            </button>
          </div>

          <div className="task-content">
            <h4>My Tasks:</h4>
            {user && user?.tasks && user?.tasks?.length > 0 ? (
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col" className="fs-5 fw-bold">
                      Task Name
                    </th>
                    <th scope="col" className="fs-5 fw-bold">
                      Due Date
                    </th>
                    <th scope="col" className="fs-5 fw-bold ">
                      Owners
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.tasks?.map((task) => {
                    const dueDate = calculateDueDate(
                      task?.createdAt,
                      task?.timeToComplete
                    );
                    return (
                      <tr key={task?._id}>
                        <td>
                          <Link
                            to={`/taskDetails/${task?._id}`}
                            className="text-decoration-none text-dark fw-bold pointer"
                          >
                            {task?.name}
                          </Link>
                        </td>
                        <td>{dueDate}</td>
                        <td>
                          {task?.owners?.map((owner, index) => (
                            <span key={owner._id}>
                              <Link
                                to={`/profile/${owner?._id}`}
                                className="text-decoration-none text-dark fw-bold pointer"
                              >
                                {owner?.name}
                              </Link>
                              {index < task?.owners?.length - 1 && ", "}
                            </span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No tasks available</p>
            )}

            <div>
              <button onClick={toggleTaskModal} className="addProjectBtn">
                Add New Task
              </button>
            </div>
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

      {showProjectModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Project</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={projectSubmitHandler}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    className="form-control mb-3"
                    placeholder="Write project Name"
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    className="form-control mb-3"
                    placeholder="Write project description"
                  />

                  <button type="submit" className="submitBtn mt-2 form-control">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* project edit modal */}
      {showEditModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Team</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleEditModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editProjectSubmitHandler}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    name="name"
                    className="form-control mb-3"
                    placeholder="Edit team name"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    name="description"
                    className="form-control mb-3"
                    placeholder="Edit team description"
                  />

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

export default Home;
