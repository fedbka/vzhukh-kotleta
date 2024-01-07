import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/authentication";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(logoutUser())
    .then(()=> {
      navigate('/', { replace: false});
    });
  
  return null;
};

export default LogoutPage;
