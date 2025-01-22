import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { getUserDetailsAsync } from "./features/userSlice";
import Home from "./pages/Home/Home";
import { useState } from "react";
import { RequiresAuth } from "./utils/auth";
import Team from "./pages/Team/Team";
import Task from "./pages/Task/Task";
import Report from "./pages/Report/Report";
import Profile from "./pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import TeamDetails from "./pages/TeamDetails/TeamDetails";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const { status, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      dispatch(getUserDetailsAsync()).then(() => {
        navigate("/");
      });
    } else {
      navigate("/login");
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="main-container">
      <ToastContainer
        position="bottom-right"
        autoClose="3000"
        closeOnClick="true"
        draggable="true"
        borderRadius="10px"
      />
      {status === "loading" ? (
        <p>loading....</p>
      ) : (
        <>
          <Navbar onToggleSidebar={toggleSidebar} />
          {/* <div className={`layout ${showSidebar ? "show-sidebar" : ""}`}></div> */}
          <div className="body">
            <Routes>
              <Route path="/reports" element={<Report />} />

              <Route
                path="/"
                element={
                  <RequiresAuth>
                    <Home />
                  </RequiresAuth>
                }
              />

              {/* protected Routes */}
              <Route
                path="/projectDetails/:projectId"
                element={
                  <RequiresAuth>
                    <ProjectDetails />
                  </RequiresAuth>
                }
              />

              <Route
                path="/teams"
                element={
                  <RequiresAuth>
                    <Team />
                  </RequiresAuth>
                }
              />
              <Route
                path="/teamDetails/:teamId"
                element={
                  <RequiresAuth>
                    <TeamDetails />
                  </RequiresAuth>
                }
              />
              <Route
                path="/tasks"
                element={
                  <RequiresAuth>
                    <Task />
                  </RequiresAuth>
                }
              />
              <Route
                path="/taskDetails/:taskId"
                element={
                  <RequiresAuth>
                    <TaskDetails />
                  </RequiresAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequiresAuth>
                    <Profile />
                  </RequiresAuth>
                }
              />
              <Route
                path="/report"
                element={
                  <RequiresAuth>
                    <Report />
                  </RequiresAuth>
                }
              />

              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
