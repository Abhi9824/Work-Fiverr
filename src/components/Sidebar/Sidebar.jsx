import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Assuming styles are defined here
import { FaTasks, FaChartPie, FaCogs } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state?.user);

  const isDashboard = location.pathname === "/";
  const { isToggle } = useSelector((state) => state.toggle);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Detect screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 800); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar is always visible on large screens
  if (isLargeScreen || isToggle) {
    return (
      <div className="sideBar">
        {/* If not on the main dashboard, show 'Back to Dashboard' */}
        {!isDashboard ? (
          <ul className="side-list py-4">
            <li className="side-items">
              <NavLink to="/" className="nav-link active-link">
                <RiDashboardFill className="icon" />
                <span>Back to Dashboard</span>
              </NavLink>
            </li>
          </ul>
        ) : (
          /* Default sidebar links */
          <ul className="side-list py-4">
            <li className="side-items">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <GoProjectSymlink className="icon me-2" />
                <span>Projects</span>
              </NavLink>
            </li>
            <li className="side-items">
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <BsPeopleFill className="icon me-2" />
                <span>Teams</span>
              </NavLink>
            </li>
            <li className="side-items">
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <FaTasks className="icon me-2" />
                <span>Tasks</span>
              </NavLink>
            </li>
            <li className="side-items">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <FaChartPie className="icon me-2" />
                <span>Reports</span>
              </NavLink>
            </li>
            <li className="side-items">
              <NavLink
                to={`/profile/${user?._id}`}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active-link" : ""}`
                }
              >
                <BsPeopleFill className="icon me-2" />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default Sidebar;
