import styles from "./modal-overlay.module.css";
import propTypes from "prop-types";

const ModalOverlay = ({ onClick, children }) => {
  return (
    <div className={styles.component} onClick={onClick}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.any,
};

export default ModalOverlay;
