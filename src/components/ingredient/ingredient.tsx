import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../types/types.ts";
import styles from "./ingredients.module.css";

export const Ingridient = ({ data }: { data: TIngredient }) => {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { ...data }
  });
  return (
    <Link className={styles.card} to={`/ingredients/${data._id}`} state={{ background: location }} ref={dragRef}>
      {data.__v !== 0 && <Counter count={data.__v} />}
      <img className={styles.image} src={data.image} alt={data.name} />
      <div className={styles.price}>
        <span>{data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.title}>{data.name}</p>
    </Link>
  )
}