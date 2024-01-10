import { useEffect, useMemo } from "react";
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

  const ingridient = useMemo(
    () => (itemsLoaded ? ingridients.find((item) => item._id === params.id) : {}),
    [itemsLoaded, params.id]
  );

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Детали ингридиента</h1>
      <img className={styles.image} src={ingridient.image_large} alt={ingridient.name} />
      <p className={styles.name}>{ingridient.name}</p>
      <section className={styles.composition}>
        <div className={styles.composition_item}>
          <p className={styles.text}>Калории, Ккал</p>
          <p className={styles.digits}>{ingridient.calories}</p>
        </div>
        <div className={styles.composition_item}>
          <p className={styles.text}>Белки, г</p>
          <p className={styles.digits}>{ingridient.proteins}</p>
        </div>
        <div className={styles.composition_item}>
          <p className={styles.text}>Жиры, г</p>
          <p className={styles.digits}>{ingridient.fat}</p>
        </div>
        <div className={styles.composition_item}>
          <p className={styles.text}>Углеводы, г</p>
          <p className={styles.digits}>{ingridient.carbohydrates}</p>
        </div>
      </section>
    </div>
  );
};

export default IngridientDetails;
