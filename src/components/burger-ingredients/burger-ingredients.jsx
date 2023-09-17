import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngridientList from "../ingridient-list/ingridient-list";
import IngridientDetails from "../ingridient-details/ingridients-details";
import { getIngridientsTypes, SET_CURRENT_INGRIDIENTS_TYPE} from "../../services/actions/ingridients-types";
import { DECREASE_INGRIDIENT_QUANTITY, INCREASE_INGRIDIENT_QUANTITY, getIngridients } from "../../services/actions/ingridients";
import { DELETE_SELECTED_INGRIDIENT, SET_SELECTED_INGRIDIENT } from "../../services/actions/selected-ingridient";

function BurgerIngredients() {
  const ingridientsTypes = useSelector(state => state.ingridientsTypes);
  const ingridients = useSelector(state => state.ingridients);
  const selectedIngridient = useSelector(state => state.selectedIngridient);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);
   
  const setCurrentIngridientType = (ingridientType) => {
    dispatch({
      type: SET_CURRENT_INGRIDIENTS_TYPE,
      item: {...ingridientType},
    })
  };

  const ingridientOnClick = (ingridient) => {
    dispatch({
      type: SET_SELECTED_INGRIDIENT,
      item: ingridient,
    });
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(getIngridientsTypes());
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <>
      {showModal && (
        <Modal handlerOnClose={() => {setShowModal(false); dispatch({type: DELETE_SELECTED_INGRIDIENT})}}>
          <IngridientDetails ingridient={selectedIngridient.item} />
        </Modal>
      )}
      <section className={styles.component}>
        <h1 className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <ul className={styles.tabs}>
          {ingridientsTypes.items.map((ingridientsType, index) => (
            <li key={index} className={styles.tab}>
              <Tab
                active={ingridientsTypes.currentItem.id === ingridientsType.id}
                value={{...ingridientsType}}
                onClick={setCurrentIngridientType}
              >
                {ingridientsType.name}
              </Tab>
            </li>
          ))}
        </ul>
        <ul className={styles.ingridients_list_by_type}>
          {ingridientsTypes.items.map((ingridientsType, index) => (
            <li key={index} className={styles.ingridients_list_type}>
              <h1 className="text text_type_main-medium pt-10 pb-6">
                {ingridientsType.name}
              </h1>
              <IngridientList
                ingridients={ingridients.items.filter(
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

export default BurgerIngredients;
