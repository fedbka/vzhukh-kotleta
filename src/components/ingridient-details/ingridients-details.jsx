import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getIngridients } from "../../services/actions/ingridients";
import styles from "./ingridients-details.module.css";

const IngridientDetails = () => {
  const itemsLoaded = useSelector((store) => store.ingridients.itemsLoaded);
  const ingridients = useSelector((store) => store.ingridients.items);
  const params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    !itemsLoaded && dispatch(getIngridients());
  }, [dispatch, itemsLoaded]);

  const ingridient = itemsLoaded ? ingridients.find((item) => item._id === params.id) : {};

  return (
    <div className={styles.card}>
      <h1 className={`${styles.title} text text_type_main-large`}>Детали ингридиента</h1>
      <img className={styles.image} src={ingridient.image_large} alt={ingridient.name} />
      <p className={`${styles.name} text text_type_main-medium mt-4 mb-4`}>{ingridient.name}</p>
      <section className={`${styles.composition} mt-4 mb-5`}>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>Калории, Ккал</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingridient.calories}</p>
        </div>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingridient.proteins}</p>
        </div>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingridient.fat}</p>
        </div>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`text text_type_digits-default text_color_inactive`}>{ingridient.carbohydrates}</p>
        </div>
      </section>
    </div>
  );
};

export default IngridientDetails;
