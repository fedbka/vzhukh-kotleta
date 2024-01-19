import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ConstructorPage from "../../pages/ConstructorPage/ConstructorPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import LogoutPage from "../../pages/LogoutPage/LogoutPage";
import OrdersHistoryPage from "../../pages/OrdersHistoryPage/OrdersHistoryPage";
import PasswordRecoveryPage from "../../pages/PasswordRecoveryPage/PasswordRecoveryPage";
import PasswordResetPage from "../../pages/PasswordResetPage/PasswordResetPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import { autoLoginUser } from "../../services/actions/authentication";
import AppHeader from "../app-header/app-header";
import IngridientDetails from "../ingridient-details/ingridients-details";
import Modal from "../modal/modal";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginUser()).catch((err) => {});
  }, [dispatch]);

  const onCloseHandler = useCallback(() => navigate(-1), [navigate]);

  return (
    <div>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute anonymous={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute anonymous={false}>
              <OrdersHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute anonymous={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous={true}>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute anonymous={true}>
              <PasswordRecoveryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute anonymous={true}>
              <PasswordResetPage />
            </ProtectedRoute>
          }
        />
        <Route path="/ingridients/:id" element={<IngridientDetails />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingridients/:id"
            element={
              <Modal handlerOnClose={onCloseHandler}>
                <IngridientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
