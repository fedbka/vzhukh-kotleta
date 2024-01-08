import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../navigation-link/navigation-link";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavigationLink Icon={BurgerIcon} link="/" text="Конструктор" />
        <NavigationLink Icon={ListIcon} link="/feed" text="Лента заказов" />
      </nav>
      <nav className={styles.nav_type_logo}>
        <NavigationLink Icon={Logo} link="/" text="" />
      </nav>
      <nav className={styles.nav}>
        <NavigationLink Icon={ProfileIcon} link="/profile" text="Личный кабинет" />
      </nav>
    </header>
  );
};

export default AppHeader;
