import { NavLink } from "react-router-dom";
import styles from "./profile-navigation.module.css";

export const ProfileNavigation = ({ pageAnnotation }: { pageAnnotation: string}) => {
  return (
    <div className={styles.navigation}>
      <NavLink to="/profile" end className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
        Профиль
      </NavLink>
      <NavLink to="/profile/orders" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
        История заказов
      </NavLink>
      <NavLink to="/logout" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
        Выход
      </NavLink>
      <span className={styles.annotation}>{pageAnnotation}</span>
    </div>
  );
};
