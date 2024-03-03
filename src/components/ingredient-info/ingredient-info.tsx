import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/store.ts";
import { useGetIngredientsQuery } from "../../services/api/ingredients.ts";
import { selectIngredients } from "../../services/store/ingredients.ts";
import styles from "./ingredient-info.module.css";

export const IngredientInfo = () => {
  const ingredients = useAppSelector(state => selectIngredients(state));
  const { isLoading, isError, isSuccess } = useGetIngredientsQuery();
  const params = useParams();
  const ingredient = ingredients?.find((ingredient) => ingredient._id === params.id);

  return (
    <div className={styles.card}>
      {isLoading && <h1 className={styles.title}>Загружаем данные...</h1>}
      {isError && <h1 className={styles.title}>Ошибка загрузки данных...</h1>}
      {isSuccess && !ingredient && <h1 className={styles.title}>Не удалось найти указанный ингредиент</h1>}
      {isSuccess && ingredient && (
        <>
          <h1 className={styles.title}>Детали ингредиента</h1>
          <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
          <p className={styles.name}>{ingredient.name}</p>
          <section className={styles.composition}>
            <div className={styles.composition_item}>
              <p className={styles.text}>Калории, Ккал</p>
              <p className={styles.digits}>{ingredient.calories}</p>
            </div>
            <div className={styles.composition_item}>
              <p className={styles.text}>Белки, г</p>
              <p className={styles.digits}>{ingredient.proteins}</p>
            </div>
            <div className={styles.composition_item}>
              <p className={styles.text}>Жиры, г</p>
              <p className={styles.digits}>{ingredient.fat}</p>
            </div>
            <div className={styles.composition_item}>
              <p className={styles.text}>Углеводы, г</p>
              <p className={styles.digits}>{ingredient.carbohydrates}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}