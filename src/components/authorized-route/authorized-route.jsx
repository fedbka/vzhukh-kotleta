import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthorizedRoute = ({ element }) => {
  const userAuthenticated = useSelector((store) => store.authentication.userAuthenticated);
  if (!userAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
