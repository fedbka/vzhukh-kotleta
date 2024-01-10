import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../../services/actions/authentication";

const LogoutPage = () => {
  const userAuthenticated = useSelector(store => store.authentication.userAuthenticated)
  const dispatch = useDispatch();
  useEffect(() => {
    userAuthenticated && dispatch(logoutUser());
  }, [dispatch, userAuthenticated]);

  return <Navigate to="/login" />;
};

export default LogoutPage;
