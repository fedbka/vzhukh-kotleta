import { Navigate } from "react-router-dom";
import styles from "./LogoutPage.module.css";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

const LogoutPage = () => {
  return (
    <main className={styles.page}>
      <ProfileNavigation pageAnnotation="В этом разделе вы можете выйти из своего профиля"/>
      <Navigate to="/login"/>
    </main>
  );
};

export default LogoutPage;
