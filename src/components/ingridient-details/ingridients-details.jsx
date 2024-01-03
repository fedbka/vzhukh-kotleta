import styles from "./ingridients-details.module.css";
import propTypes from "prop-types";

const IngridientDetails = ({ ingridient }) => {
  return (
    <div className={styles.card}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Детали ингридиента
      </h1>
      <img
        className={styles.image}
        src={ingridient.image_large}
        alt={ingridient.name}
      />
      <p className={`${styles.name} text text_type_main-medium mt-4 mb-4`}>
        {ingridient.name}
      </p>
      <section className={`${styles.composition} mt-4 mb-5`}>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Калории, Ккал
          </p>
          <p className={`text text_type_digits-default text_color_inactive`}>
            {ingridient.calories}
          </p>
        </div>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Белки, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive`}>
            {ingridient.proteins}
          </p>
        </div>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Жиры, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive`}>
            {ingridient.fat}
          </p>
        </div>
        <div className={styles.composition_item}>
          <p className={`text text_type_main-default text_color_inactive`}>
            Углеводы, г
          </p>
          <p className={`text text_type_digits-default text_color_inactive`}>
            {ingridient.carbohydrates}
          </p>
        </div>
      </section>
    </div>
  );
};

IngridientDetails.propTypes = {
  ingridient: propTypes.object.isRequired,
};

export default IngridientDetails;
