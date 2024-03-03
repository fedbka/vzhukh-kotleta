import type { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils.d.ts";
import { NavLink } from "react-router-dom";
import styles from "./header-link.module.css";

export const HeaderLink = ({ Icon, text, link }: {
  Icon: React.FC<TIconProps>;
  text?: string;
  link: string;
}) => {
  return (
    <NavLink to={link} className={styles.component}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          <p className={`${styles.component_text}` + (!isActive ? ` ${styles.component_text_type_inactive}` : '') }>{text}</p>
        </>
      )}
    </NavLink>
  );
};