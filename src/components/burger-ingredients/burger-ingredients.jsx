import React from "react";
import IngridientList from "../ingridient-list/ingridient-list";
import IngridientDetails from "../ingridient-details/ingridients-details";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import propTypes from "prop-types";

const modalRoot = document.getElementById("modal");
function BurgerIngredients({ ingridients, ingridientsTypes }) {
  const [currentTypeId, setCurrentTypeId] = React.useState(
    ingridientsTypes && ingridientsTypes[0] ? ingridientsTypes[0].id : ""
  );

  const [showModal, setShowModal] = React.useState(false);
  const [chosedIngridient, setChosenIngridient] = React.useState({});

  const ingridientOnClick = (ingridient) => {
    setChosenIngridient(ingridient);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal handlerOnClose={() => setShowModal(false)} modalRoot={modalRoot}>
          <IngridientDetails ingridient={chosedIngridient} />
        </Modal>
      )}
      <section className={styles.component}>
        <h1 className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </h1>
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
                ingridientOnClick={ingridientOnClick}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  ingridients: propTypes.array.isRequired,
  ingridientsTypes: propTypes.array.isRequired,
};

export default BurgerIngredients;
