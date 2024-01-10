import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngridients } from "../../services/actions/ingridients";
import { getIngridientsTypes, setCurrentIngridientsType } from "../../services/actions/ingridients-types";
import IngridientList from "../ingridient-list/ingridient-list";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const ingridientsTypes = useSelector((state) => state.ingridientsTypes);
  const ingridients = useSelector((state) => state.ingridients);

  const dispatch = useDispatch();

  const refUl = useRef();
  const refBunTab = useRef();
  const refSauceTab = useRef();

  const setCurrentIngridientType = (ingridientType) => {
    dispatch(setCurrentIngridientsType(ingridientType));
  };

  const onScrollHandler = useCallback(() => {
    const topOfIngridientsList = refUl.current.getBoundingClientRect().top;
    const topOfBunTab = refBunTab.current.getBoundingClientRect().top;
    const topOfSauceTab = refSauceTab.current.getBoundingClientRect().top;

    let ingridientTypeId = "bun";
    if (topOfSauceTab < topOfIngridientsList) {
      ingridientTypeId = "main";
    } else if (topOfBunTab < topOfIngridientsList) {
      ingridientTypeId = "sauce";
    }
    dispatch(setCurrentIngridientsType({ id: ingridientTypeId }));
  }, [dispatch, refUl, refBunTab, refSauceTab]);

  useEffect(() => {
    if (!ingridientsTypes.itemsLoaded) {
      dispatch(getIngridientsTypes());
    }

    if (!ingridients.itemsLoaded) {
      dispatch(getIngridients());
    }
  }, [dispatch, ingridientsTypes.itemsLoaded, ingridients.itemsLoaded]);

  return (
    <>
      <section className={styles.component}>
        <h1 className={styles.componentTitle}>Соберите бургер</h1>
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
        <ul className={styles.ingridients_list_by_type} onScroll={onScrollHandler} ref={refUl}>
          {ingridientsTypes.items.map((ingridientsType, index) => (
            <li
              key={index}
              className={styles.ingridients_list_type}
              ref={ingridientsType.id === "bun" ? refBunTab : ingridientsType.id === "sauce" ? refSauceTab : null}
            >
              <h1 className={styles.ingridientTypeTitle}>{ingridientsType.name}</h1>
              <IngridientList
                ingridients={ingridients.items.filter((ingridient) => ingridient.type === ingridientsType.id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default BurgerIngredients;
