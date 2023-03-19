import React from "react";
import Ingridient from "../ingridient/ingridient";
import styles from "./ingridient-list.module.css";
import propTypes from "prop-types";

function IngridientList({ ingridients }) {
  return (
    <ul className={styles.ingridients_list}>
      {ingridients.map((ingridient) => (
        <li key={ingridient._id}>
          <Ingridient ingridient={ingridient} />
        </li>
      ))}
    </ul>
  );
}

IngridientList.propTypes = {
  ingridients: propTypes.array,
};

export default IngridientList;
