import React from "react";
import IngridientList from "../ingridient-list/ingridient-list";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";

function BurgerIngredients({ ingridients, ingridientsTypes }) {
  const [currentTypeId, setCurrentTypeId] = React.useState(
    ingridientsTypes && ingridientsTypes[0] ? ingridientsTypes[0].id : ""
  );
  return (
    <section className={styles.component}>
      <h1 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h1>
      <ul className={styles.tabs}>
        {ingridientsTypes.map((ingridientsType, index) => (
          <li key={index} className={styles.tab}>
            <Tab
              active={currentTypeId === ingridientsType.id}
              value={ingridientsType.id}
              onClick={setCurrentTypeId}
            >
              {ingridientsType.name}
            </Tab>
          </li>
        ))}
      </ul>
      <ul className={styles.ingridients_list_by_type}>
        {ingridientsTypes.map((ingridientsType, index) => (
          <li key={index} className={styles.ingridients_list_type}>
            <h1 className="text text_type_main-medium pt-10 pb-6">
              {ingridientsType.name}
            </h1>
            <IngridientList
              ingridients={ingridients.filter(
                (ingridient) => ingridient.type === ingridientsType.id
              )}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingridients: propTypes.array,
  ingridientsTypes: propTypes.array,
};

export default BurgerIngredients;
