import propTypes from "prop-types";
import Ingridient from "../ingridient/ingridient";
import styles from "./ingridient-list.module.css";

const IngridientList = ({ ingridients }) => {
  return (
    <ul className={styles.ingridients_list}>
      {ingridients.map((ingridient) => (
        <li key={ingridient._id}>
          <Ingridient
            ingridient={ingridient}
          />
        </li>
      ))}
    </ul>
  );
};

IngridientList.propTypes = {
  ingridients: propTypes.array.isRequired,
};

export default IngridientList;
