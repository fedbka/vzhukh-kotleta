import React, { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getIngridients } from "../../services/actions/ingridients";
import {
  SET_CURRENT_INGRIDIENTS_TYPE,
  getIngridientsTypes,
} from "../../services/actions/ingridients-types";
import {
  DELETE_SELECTED_INGRIDIENT,
  SET_SELECTED_INGRIDIENT,
} from "../../services/actions/selected-ingridient";
import IngridientDetails from "../ingridient-details/ingridients-details";
import IngridientList from "../ingridient-list/ingridient-list";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const ingridientsTypes = useSelector((state) => state.ingridientsTypes);
  const ingridients = useSelector((state) => state.ingridients);
  const selectedIngridient = useSelector((state) => state.selectedIngridient);

  const dispatch = useDispatch();

  const [showModal, setShowModal] = React.useState(false);

  const refUl = useRef();
  const refBunTab = useRef();
  const refSauceTab = useRef();

  const setCurrentIngridientType = (ingridientType) => {
    dispatch({
      type: SET_CURRENT_INGRIDIENTS_TYPE,
      item: { ...ingridientType },
    });
  };

  const ingridientOnClick = (ingridient) => {
    dispatch({
      type: SET_SELECTED_INGRIDIENT,
      item: ingridient,
    });
    setShowModal(true);
  };

  const onScrollHandler = () => {
    const topOfIngridientsList = refUl.current.getBoundingClientRect().top;
    const topOfBunTab = refBunTab.current.getBoundingClientRect().top;
    const topOfSauceTab = refSauceTab.current.getBoundingClientRect().top;

    if (topOfSauceTab < topOfIngridientsList) {
      dispatch({ type: SET_CURRENT_INGRIDIENTS_TYPE, item: {id: 'main'} });
    } else
    if (topOfBunTab < topOfIngridientsList) {
      dispatch({ type: SET_CURRENT_INGRIDIENTS_TYPE, item: {id: 'sauce'} });
    } else {
      dispatch({ type: SET_CURRENT_INGRIDIENTS_TYPE, item: {id: 'bun'} });
    }
  };

  useEffect(() => {
    dispatch(getIngridientsTypes());
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <>
      {showModal && (
        <Modal
          handlerOnClose={() => {
            setShowModal(false);
            dispatch({ type: DELETE_SELECTED_INGRIDIENT });
          }}
        >
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
                value={{ ...ingridientsType }}
                onClick={setCurrentIngridientType}
              >
                {ingridientsType.name}
              </Tab>
            </li>
          ))}
        </ul>
        <ul
          className={styles.ingridients_list_by_type}
          onScroll={onScrollHandler}
          ref={refUl}
        >
          {ingridientsTypes.items.map((ingridientsType, index) => (
            <li
              key={index}
              className={styles.ingridients_list_type}
              ref={
                ingridientsType.id === "bun"
                  ? refBunTab
                  : ingridientsType.id === "sauce"
                  ? refSauceTab
                  : null
              }
            >
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
};

export default BurgerIngredients;
