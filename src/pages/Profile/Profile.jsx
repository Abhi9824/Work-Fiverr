import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";
import { logoutUser } from "../../features/userSlice";

const Profile = () => {
  const { user, users } = useSelector((state) => state?.user);
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const profileData = users?.find((user) => user?._id === profileId);
  const logoutHandler = () => {
    if (profileData?._id === user?._id) {
      dispatch(logoutUser());
    }
  };

  return (
    <div className="body">
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <h2 className="main-content-heading">Profile Data</h2>
          <div className="d-flex justify-content-center align-items-center py-3 col-md-12">
            <div className="col-md-6 py-4">
              <div className="card  profile mb-3">
                <div className="card-body d-flex flex-column">
                  <p className="details">Name: {profileData?.name}</p>
                  <p className="details">Email: {profileData?.email}</p>
                  <p className="details">
                    Total Project Assigned Count:{" "}
                    {profileData?.projects?.length}
                  </p>
                  <p className="details">
                    Total Tasks Assigned Count: {profileData?.tasks?.length}
                  </p>
                  <p className="details">
                    Total Team Associated Count: {profileData?.teams?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={logoutHandler} className="addProjectBtn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
