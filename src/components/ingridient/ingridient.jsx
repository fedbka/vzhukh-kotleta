import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridient.module.css";
import propTypes from "prop-types";


function Ingridient({ ingridient }) {
  return (
    <div className={styles.card}>
      <Counter count={1} extraClass="m-1"/>
      <img className={styles.image} src={ingridient.image} alt={ingridient.name} />
      <div className={`${styles.price} pt-2 pb-2`}>
        <span className="text text_type_main-medium">{ingridient.price}</span>
        <CurrencyIcon/>
      </div>
      <p className={`text text_type_main-default ${styles.title}`}> 
        {ingridient.name}
      </p>
    </div>
  );
}

Ingridient.propTypes = {
  ingridient: propTypes.object,
}

export default Ingridient;