import { Route, Routes, useLocation } from "react-router-dom";
import { AuthorizedRoute } from "../authorized-route/authorized-route";
import { AnonymousRoute } from "../anonymous-route/anonymous-route";
import ConstructorPage from "../../pages/ConstructorPage/ConstructorPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import LogoutPage from "../../pages/LogoutPage/LogoutPage";
import OrdersHistoryPage from "../../pages/OrdersHistoryPage/OrdersHistoryPage";
import PasswordRecoveryPage from "../../pages/PasswordRecoveryPage/PasswordRecoveryPage";
import PasswordResetPage from "../../pages/PasswordResetPage/PasswordResetPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import AppHeader from "../app-header/app-header";

const App = () => {
  const location = useLocation();
  return (
    <div>
      <AppHeader />
      <Routes location={location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<AuthorizedRoute element={<FeedPage />} />} />
        <Route path="/profile" element={<AuthorizedRoute element={<ProfilePage />} />} />
        <Route path="/profile/orders" element={<AuthorizedRoute element={<OrdersHistoryPage />} />} />
        <Route path="/logout" element={<AuthorizedRoute element={<LogoutPage />} />} />
        <Route path="/login" element={<AnonymousRoute element={<LoginPage />} />} />
        <Route path="/register" element={<AnonymousRoute element={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<AnonymousRoute element={<PasswordRecoveryPage />} />} />
        <Route path="/reset-password" element={<AnonymousRoute element={<PasswordResetPage />} />} />
      </Routes>
    </div>
  );
};

export default App;
