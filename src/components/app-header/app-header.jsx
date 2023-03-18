import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationLink from "../navigation-link/navigation-link";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavigationLink Icon={BurgerIcon} text="Конструктор" active={true} />
        <NavigationLink Icon={ListIcon} text="Лента заказов" />
      </nav>
      <nav className={styles.nav_logo}>
        <NavigationLink Icon={Logo} text="" link="#" />
      </nav>
      <nav className={styles.nav}>
        <NavigationLink Icon={ProfileIcon} text="Личный кабинет" />
      </nav>
    </header>
  );
}

export default AppHeader;
