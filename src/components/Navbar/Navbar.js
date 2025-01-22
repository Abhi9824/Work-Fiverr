import React from "react";
import { DiHtml5Multimedia } from "react-icons/di";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <button className="hamburger" onClick={onToggleSidebar}>
        ☰
      </button>
      <header className="nav-header">
        <NavLink to="/" className="nav_icon">
          WorkFiver
          <DiHtml5Multimedia />
        </NavLink>
      </header>
      <ul className="nav-body">
        {isLoggedIn ? (
          <li className="nav-item">
            <IoPersonCircleSharp />
            <span>{user.name}</span>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <span>Login</span>
              <NavLink to="/login" className="nav-link">
                <RiLoginBoxLine />
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
