import propTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AnonymousRoute = ({ element }) => {
  const userAuthenticated = useSelector((store) => store.authentication.userAuthenticated);
  if (userAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

