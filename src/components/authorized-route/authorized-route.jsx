import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AuthorizedRoute = ({ element }) => {
  const userAuthenticated = useSelector((store) => store.authentication.userAuthenticated);
  const location = useLocation();

  if (!userAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location.pathname }} replace />;
  }

  return element;
};
