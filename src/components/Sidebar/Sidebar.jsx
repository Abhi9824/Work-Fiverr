import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css"; // Assuming styles are defined here
import { FaTasks, FaChartPie, FaCogs } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";

// const Sidebar = () => {
//   const location = useLocation();

//   const isDashboard = location.pathname === "/";

//   return (
//     <div className="sideBar">
//       {/* Render based on the route */}
//       {!location.pathname.includes("details") && (
//         <ul className="side-list">
//           <li className="side-items">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `nav-link ${isActive ? "active-link" : ""}`
//               }
//             >
//               <GoProjectSymlink className="icon" />
//               <span>Projects</span>
//             </NavLink>
//           </li>
//           <li className="side-items">
//             <NavLink
//               to="/teams"
//               className={({ isActive }) =>
//                 `nav-link ${isActive ? "active-link" : ""}`
//               }
//             >
//               <BsPeopleFill className="icon" />
//               <span>Teams</span>
//             </NavLink>
//           </li>
//           <li className="side-items">
//             <NavLink
//               to="/tasks"
//               className={({ isActive }) =>
//                 `nav-link ${isActive ? "active-link" : ""}`
//               }
//             >
//               <FaTasks className="icon" />
//               <span>Tasks</span>
//             </NavLink>
//           </li>
//           <li className="side-items">
//             <NavLink
//               to="/reports"
//               className={({ isActive }) =>
//                 `nav-link ${isActive ? "active-link" : ""}`
//               }
//             >
//               <FaChartPie className="icon" />
//               <span>Reports</span>
//             </NavLink>
//           </li>
//         </ul>
//       )}

//       {location.pathname.includes("details") && (
//         <ul className="side-list">
//           <li className="side-items">
//             <NavLink to="/" className="nav-link active-link">
//               <span>Back to Projects</span>
//             </NavLink>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

const Sidebar = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/";

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
              <GoProjectSymlink className="icon" />
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
              <BsPeopleFill className="icon" />
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
              <FaTasks className="icon" />
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
              <FaChartPie className="icon" />
              <span>Reports</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
