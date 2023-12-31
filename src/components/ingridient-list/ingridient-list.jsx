import React from "react";
import Ingridient from "../ingridient/ingridient";
import styles from "./ingridient-list.module.css";
import propTypes from "prop-types";

const IngridientList = ({ ingridients, ingridientOnClick }) => {
  return (
    <ul className={styles.ingridients_list}>
      {ingridients.map((ingridient) => (
        <li key={ingridient._id}>
          <Ingridient ingridient={ingridient} ingridientOnClick={ingridientOnClick}/>
        </li>
      ))}
    </ul>
  );
}

IngridientList.propTypes = {
  ingridients: propTypes.array.isRequired,
  ingridientOnClick: propTypes.func,
};

export default IngridientList;
