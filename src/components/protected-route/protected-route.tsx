import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/store.ts";
import { selectIsAuthenticated } from "../../services/store/user.ts";

export const ProtectedRoute = ({ anonymous, children }: { anonymous: boolean; children: JSX.Element }) => {

  const location = useLocation();
  const from: string = location.state?.from || '/';
  const userIsAuthenticated = useAppSelector(state => selectIsAuthenticated(state));

  if (anonymous && userIsAuthenticated) return (<Navigate to={from}/>);
  if (!anonymous && !userIsAuthenticated) return (<Navigate to="/login" state = {{ from: location}} />)
  
  return (
    <>
      {children}
    </>
  );
}