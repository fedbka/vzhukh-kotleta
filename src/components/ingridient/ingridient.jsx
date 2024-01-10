import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import styles from "./ingridient.module.css";

const Ingridient = ({ ingridient }) => {
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: "ingridient",
    item: { ...ingridient },
  });
  return (
    <Link className={styles.card} to={`/ingridients/${ingridient._id}`} state={{ background: location }} ref={dragRef}>
      {ingridient.__v !== 0 && <Counter count={ingridient.__v} />}
      <img className={styles.image} src={ingridient.image} alt={ingridient.name} />
      <div className={styles.price}>
        <span>{ingridient.price}</span>
        <CurrencyIcon />
      </div>
      <p className={styles.title}>{ingridient.name}</p>
    </Link>
  );
};

Ingridient.propTypes = {
  ingridient: propTypes.object.isRequired,
};

export default Ingridient;
