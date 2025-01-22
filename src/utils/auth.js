import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }}></Navigate>
  );
};
