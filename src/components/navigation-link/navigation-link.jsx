import propTypes from "prop-types";
import styles from "./navigation-link.module.css";
import { NavLink } from "react-router-dom";

const NavigationLink = ({ Icon, text ="", link = "/" }) => {
  return (
    <NavLink to={link} className={styles.link}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? "primary" : "secondary"} />
          <p
            className={
              "text text_type_main-default" + (!isActive ? " text_color_inactive" : "")
            }
          >
            {text}
          </p>
        </>
      )}
    </NavLink>
  );
}

NavigationLink.propTypes = {
  Icon: propTypes.elementType.isRequired,
  text: propTypes.string,
  link: propTypes.string,
};

export default NavigationLink;
