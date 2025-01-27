import React from "react";
import { DiHtml5Multimedia } from "react-icons/di";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { toggleSidebar } from "../../features/toggleSlice";

const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (isSmallScreen) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <div className="navbar d-flex justify-content-between">
      {isSmallScreen && (
        <div>
          <button className="hamburger" onClick={handleToggleSidebar}>
            ☰
          </button>
        </div>
      )}
      <div>
        <header className="nav-header">
          <NavLink to="/" className="nav_icon">
            WorkFiver
            <DiHtml5Multimedia />
          </NavLink>
        </header>
      </div>
      <ul className="nav-body">
        {isLoggedIn ? (
          <li className="nav-item">
            <NavLink to={`/profile/${user._id}`} className="nav-link">
              <IoPersonCircleSharp className="icon" />
              <span>{user.name}</span>
            </NavLink>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <span>Login</span>
              <NavLink to="/login" className="nav-link">
                <RiLoginBoxLine className="icon" />
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
