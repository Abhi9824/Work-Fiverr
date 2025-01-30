import React, { useEffect, useState } from "react";
import { addTeamAsync, fetchAllTeams } from "../../features/teamSlice";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import "./Team.css";
import { updateTeamAsync } from "../../features/teamSlice";
import { deleteTaskAsync } from "../../features/taskSlice";

const Team = () => {
  const dispatch = useDispatch();
  const { teams } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.user);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);

  const toggleModal = () => {
    setShowProjectModal(!showProjectModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const teamSubmitHandler = async (e) => {
    e.preventDefault();
    const taskData = {
      name,
      description,
    };
    await dispatch(addTeamAsync(taskData))
      .then(() => {
        toggleModal();
        setName("");
        setDescription("");
      })
      .then(dispatch(fetchAllTeams()));
  };

  const handleDelete = (teamId) => {
    // Dispatch the delete action with the team ID
    dispatch(deleteTaskAsync(teamId));
  };

  const handleEdit = (teamId) => {
    const selectedTeam = teams.find((team) => team._id === teamId);
    if (selectedTeam) {
      setEditName(selectedTeam.name);
      setEditDescription(selectedTeam.description);
      setEditingTeamId(teamId);
      toggleEditModal();
    }
  };

  const editTeamSubmitHandler = async (e) => {
    e.preventDefault();
    if (editingTeamId) {
      const updatedTeamData = { name: editName, description: editDescription };
      await dispatch(
        updateTeamAsync({
          teamId: editingTeamId,
          dataToUpdate: updatedTeamData,
        })
      )
        .then(() => {
          toggleEditModal();
          setEditName("");
          setEditDescription("");
          setEditingTeamId(null);
        })
        .then(() => dispatch(fetchAllTeams()));
    }
  };

  useEffect(() => {
    dispatch(fetchAllTeams());
  }, [dispatch]);

  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">Team Management</h2>
          <div className="content-desc d-flex row py-3 col-md-12">
            {teams?.map((team) => (
              <div className="col-md-4 mb-3" key={team._id}>
                <div className="card mb-3">
                  <div className="card-body d-flex justify-content-between">
                    <Link
                      to={`/teamDetails/${team._id}`}
                      className="card-link"
                      state={team}
                    >
                      <h5>{team.name}</h5>
                      <p className="fw-light">{team.description}</p>
                    </Link>
                    <div className="d-flex justify-content-between mt-3 gap-2">
                      {team?.members?.some((m) => m._id === user?._id) && (
                        <>
                          <div>
                            <button
                              onClick={() => handleEdit(team?._id)}
                              className="editBtn"
                            >
                              <BiEdit className="icon" />
                            </button>
                          </div>
                          <div>
                            <button
                              className="editBtn"
                              onClick={() => handleDelete(team?._id)}
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
            ))}
          </div>
          <div>
            <button onClick={toggleModal} className="addProjectBtn">
              Add New Team
            </button>
          </div>
        </div>
      </div>
      {showProjectModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Team</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={teamSubmitHandler}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    className="form-control mb-3"
                    placeholder="Write task name"
                  />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    className="form-control mb-3"
                    placeholder="Write team description"
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

      {/* edit team modal */}
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
                <form onSubmit={editTeamSubmitHandler}>
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

export default Team;
