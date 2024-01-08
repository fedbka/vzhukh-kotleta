import propTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, anonymous = false }) => {
  const userAuthenticated = useSelector((store) => store.authentication.userAuthenticated);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && userAuthenticated) return <Navigate to={ from } />;

  if (!anonymous && !userAuthenticated) return <Navigate to="/login" state={{ from: location}}/>;

  return children;
}

ProtectedRoute.propTypes = {
  children: propTypes.object.isRequired,
  anonymous: propTypes.bool,
};

export default ProtectedRoute;