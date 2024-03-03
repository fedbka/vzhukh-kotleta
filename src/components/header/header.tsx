import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { HeaderLink } from "../header-link/header-link.tsx";
import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.component}>
      <div className={styles.content}>
        <nav className={styles.block_type_left}>
          <HeaderLink Icon={BurgerIcon} link="/" text="Конструктор" />
          <HeaderLink Icon={ListIcon} link="/feed" text="Лента заказов" />
        </nav>
        <nav className={styles.block_type_logo}>
          <HeaderLink Icon={Logo} link="/" text="" />
        </nav>
        <nav className={styles.block_type_right}>
          <HeaderLink Icon={ProfileIcon} link="/profile" text="Личный кабинет" />
        </nav>
      </div>
    </header>
  );
};
