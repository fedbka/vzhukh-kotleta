import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store.ts";
import { useLogoutUserMutation } from "../../services/api/auth.ts";
import { selectIsAuthenticated } from "../../services/store/user.ts";

export const LogoutPage = () => {
  const userIsAuthenticated = useAppSelector(selectIsAuthenticated);

  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsAuthenticated) {
      logoutUser({});
    }
    navigate('/login')
  }, [userIsAuthenticated, logoutUser, navigate]);

  return null;
};
