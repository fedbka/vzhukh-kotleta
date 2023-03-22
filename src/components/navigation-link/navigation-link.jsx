import React from "react";
import propTypes from "prop-types";
import styles from "./navigation-link.module.css";

function NavigationLink({ Icon, text, link = "#", active = false }) {
  return (
    <a className={styles.link} href={link}>
      <Icon type={active ? "primary" : "secondary"} />
      <p
        className={
          "text text_type_main-default " + (!active ? "text_color_inactive" : "")
        }
      >
        {text}
      </p>
    </a>
  );
}

NavigationLink.propTypes = {
  Icon: propTypes.elementType.isRequired,
  text: propTypes.string.isRequired,
  link: propTypes.string,
  active: propTypes.bool,
}

export default NavigationLink;
