import { NavLink } from "react-router-dom";
import styles from "./profile-navigation.module.css";


const ProfileNavigation = ({ pageAnnotation }) => {
  const navLinkInactiveCSS = `text text_type_main-medium text_color_inactive ${styles.link}`;
  const navLinkActiveCSS = `text text_type_main-medium text_color_primary ${styles.link}`;
  const pageAnnotationCSS = "pt-20 text text_type_main-default text_color_inactive";

  return (
    <div className={styles.navigation}>
      <NavLink to="/profile" end className={({ isActive }) => (isActive ? navLinkActiveCSS : navLinkInactiveCSS)}>
        Профиль
      </NavLink>
      <NavLink to="/profile/orders" className={({ isActive }) => (isActive ? navLinkActiveCSS : navLinkInactiveCSS)}>
        История заказов
      </NavLink>
      <NavLink to="/logout" className={({ isActive }) => (isActive ? navLinkActiveCSS : navLinkInactiveCSS)}>
        Выход
      </NavLink>
      <span className={pageAnnotationCSS}>{pageAnnotation}</span>
    </div>
  );
};

export default ProfileNavigation;
