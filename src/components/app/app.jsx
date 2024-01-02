import { Route, Routes, useLocation } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../../pages/ConstructorPage/ConstructorPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";
import PasswordRecoveryPage from "../../pages/PasswordRecoveryPage/PasswordRecoveryPage";
import PasswordResetPage from "../../pages/PasswordResetPage/PasswordResetPage";
import OrdersHistoryPage from "../../pages/OrdersHistoryPage/OrdersHistoryPage";
import LogoutPage from "../../pages/LogoutPage/LogoutPage";

const App = () => {
  const location = useLocation();
  return (
    <div>
      <AppHeader />
      <Routes location={location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/profile/orders" element={<OrdersHistoryPage/>}/>
        <Route path="/logout" element={<LogoutPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<PasswordRecoveryPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
      </Routes>
    </div>
  );
};

export default App;
