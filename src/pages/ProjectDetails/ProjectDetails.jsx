import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchAllTasks, filteredTaskAsync } from "../../features/taskSlice";
import { getAllTagsAsync } from "../../features/tagsSlice";
const { calculateDueDate } = require("../../utils/dateFormat");

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  const { users } = useSelector((state) => state.user);
  const { tags } = useSelector((state) => state.tags);
  const { teams } = useSelector((state) => state.team);
  const [owner, setOwner] = useState([]);
  const [tag, setTag] = useState([]);
  const [stats, setStats] = useState("");
  const [team, setTeam] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Reset handler
  const resetHandler = async () => {
    setOwner([]);
    setTag([]);
    setStats("");
    setTeam("");
    const filter = {
      owner: [],
      tags: "",
      status: "",
      team: "",
      project: state,
    };
    const response = await dispatch(filteredTaskAsync(filter));
    if (response?.payload) {
      setFiltered(response.payload);
    }
  };

  // Fetch tags and tasks once on mount
  useEffect(() => {
    dispatch(getAllTagsAsync());
    dispatch(fetchAllTasks());
  }, [dispatch]);

  const projectData = tasks?.filter(
    (task) => task.project._id.toString() === projectId
  );

  // Update `filtered` state initially and when `projectData` changes
  useEffect(() => {
    if (!filtered.length && projectData?.length) {
      setFiltered(projectData);
    }
  }, [projectData]);

  // Handle owner checkbox changes
  const ownerHandler = (e) => {
    const { value, checked } = e.target;
    setOwner((prev) =>
      checked ? [...prev, value] : prev.filter((name) => name !== value)
    );
  };

  // Handle tag selection
  const tagHandler = (e) => {
    const selectedTagId = e.target.value;
    setTag(selectedTagId);
  };

  // Filter handler
  const filterHandler = async (e) => {
    e.preventDefault();
    const filter = {
      owner: owner.length > 0 ? owner : [],
      tags: tag,
      status: stats || "",
      team: team || "",
      project: state,
    };

    if (
      !filter.owner.length === 0 &&
      !filter.tags &&
      !filter.status &&
      !filter.team
    ) {
      // Reset to default project data when no filters
      setFiltered(projectData);
      return;
    }

    const response = await dispatch(filteredTaskAsync(filter));
    if (response?.payload) {
      setFiltered(response.payload);
    }
  };

  const teamHandler = (e) => {
    const selectedTeamId = e.target.value;
    const selectedTeamName =
      teams?.find((t) => t._id === selectedTeamId)?.name || "";
    setTeam(selectedTeamName);
  };

  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">{state}</h2>

          <div className="task-content">
            {/* Filters Section */}
            <div>
              <h3>Filters:</h3>
              <form onSubmit={filterHandler}>
                <div className="d-flex justify-content-between ">
                  <div>
                    <div className="py-2 d-flex">
                      <label htmlFor="owners">Owners:</label>
                      {users?.map((user) => (
                        <div key={user._id} className="mx-2">
                          <input
                            type="checkbox"
                            id={`owner-${user._id}`}
                            value={user.name}
                            onChange={ownerHandler}
                            checked={owner.includes(user.name)}
                            className="me-1"
                          />
                          <label htmlFor={`owner-${user._id}`}>
                            {user.name}
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* tags */}
                    <div className="py-2">
                      <label htmlFor="tags">Tags:</label>

                      <select
                        id="tags"
                        value={tag}
                        onChange={tagHandler}
                        className="mx-2"
                      >
                        <option value="">All</option>
                        {tags?.map((t) => (
                          <option key={t._id} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="py-2">
                      <label>Status: </label>
                      <select
                        value={stats}
                        onChange={(e) => setStats(e.target.value)}
                        className="mx-2"
                        name="stats"
                      >
                        <option value="">All</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <div className="py-2">
                      <label htmlFor="team">Team:</label>
                      <select id="team" onChange={teamHandler} className="mx-2">
                        <option value="">All</option>
                        {teams?.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 d-flex justify-content-between align-items-center gap-2">
                    <button type="submit" className="btn addProjectBtn">
                      Filter
                    </button>
                    <button
                      type="button"
                      className="btn resetBtn"
                      onClick={resetHandler}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Tasks List Section */}
            <h4 className="pt-4">Tasks List:</h4>
            {filtered?.length > 0 ? (
              /* <div className="table-responsive custom-table-wrapper"> */
              <table className="table table-bordered table-hover shadow-sm rounded custom-table">
                <thead className="table-dark">
                  <tr>
                    <th className="fs-5 fw-bold">Task Name</th>
                    <th className="fs-5 fw-bold">Status</th>
                    <th className="fs-5 fw-bold">Due Date</th>
                    <th className="fs-5 fw-bold">Owners</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((task) => {
                    const dueDate = calculateDueDate(
                      task.createdAt,
                      task.timeToComplete
                    );
                    return (
                      <tr key={task._id}>
                        <td>
                          <Link
                            to={`/taskDetails/${task._id}`}
                            className="text-decoration-none text-primary fw-semibold"
                          >
                            {task.name}
                          </Link>
                        </td>
                        <td className="text-capitalize">{task.status}</td>
                        <td>{dueDate}</td>
                        <td>
                          {task.owners.map((o, index) => (
                            <span key={o._id}>
                              <Link
                                to={`/profile/${o._id}`}
                                className="text-decoration-none text-secondary fw-medium"
                              >
                                {o.name}
                              </Link>
                              {index < task.owners.length - 1 && ", "}
                            </span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              /* </div> */
              /* <table className="table">
                <thead>
                  <tr>
                    <th className="fs-5 fw-bold">Task Name</th>
                    <th className="fs-5 fw-bold">Status</th>
                    <th className="fs-5 fw-bold">Due Date</th>
                    <th className="fs-5 fw-bold">Owners</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((task) => {
                    const dueDate = calculateDueDate(
                      task.createdAt,
                      task.timeToComplete
                    );
                    return (
                      <tr key={task._id}>
                        <td>
                          <Link
                            to={`/taskDetails/${task._id}`}
                            className="text-decoration-none text-dark fw-bold pointer"
                          >
                            {task.name}
                          </Link>
                        </td>
                        <td>{task.status}</td>
                        <td>{dueDate}</td>
                        <td>
                          {task.owners.map((o, index) => (
                            <span key={o._id}>
                              <Link
                                to={`/profile/${o._id}`}
                                className="text-decoration-none text-dark fw-bold pointer"
                              >
                                {o.name}
                              </Link>
                              {index < task.owners.length - 1 && ", "}
                            </span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> */
              <p>No tasks available for this project.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
