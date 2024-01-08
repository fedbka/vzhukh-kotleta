import { useEffect } from "react";
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
import { autoLoginUser, getUserProfile } from "../../services/actions/authentication";
import { AnonymousRoute } from "../anonymous-route/anonymous-route";
import AppHeader from "../app-header/app-header";
import { AuthorizedRoute } from "../authorized-route/authorized-route";
import IngridientDetails from "../ingridient-details/ingridients-details";
import Modal from "../modal/modal";
const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLoginUser())
      .then(() => dispatch(getUserProfile()))
      .catch((err) => {});
  }, [dispatch]);

  const onCloseHandler = () => navigate(-1);
  return (
    <div>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<AuthorizedRoute element={<FeedPage />} />} />
        <Route path="/profile" element={<AuthorizedRoute element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<AuthorizedRoute element={<OrdersHistoryPage />} />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/login" element={<AnonymousRoute element={<LoginPage />} />} />
        <Route path="/register" element={<AnonymousRoute element={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<AnonymousRoute element={<PasswordRecoveryPage />} />} />
        <Route path="/reset-password" element={<AnonymousRoute element={<PasswordResetPage />} />} />
        <Route path="/ingridients/:id" element={<IngridientDetails />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingridients/:id"
            element={
              <Modal  handlerOnClose={onCloseHandler}>
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
