import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const TeamDetails = () => {
  const { teamId } = useParams();
  const { teams, teamStatus } = useSelector((state) => state.team);

  const teamData = teams?.find((team) => team._id === teamId);
  console.log("teamData", teamData);
  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">Team Details</h2>
          <div className="d-flex justify-content-center flex-column align-items-center py-4">
            <ul className="list-group col-md-6 fs-5">
              <li className="list-group-item">Name: {teamData?.name}</li>
              <li className="list-group-item">
                Description: {teamData?.description || ""}
              </li>
              <li className="list-group-item">
                Members:{" "}
                {teamData?.members && teamData?.members?.length > 0
                  ? teamData?.members.map((member, index) => (
                      <span key={member._id}>
                        {member.name}
                        {index < teamData?.members.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : ""}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
