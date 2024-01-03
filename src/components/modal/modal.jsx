import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modal");
const Modal = ({ handlerOnClose, children }) => {
  useEffect(() => {
    const handlerOnPressEsc = (event) =>
      event.key === "Escape" && handlerOnClose();

    document.addEventListener("keydown", handlerOnPressEsc);

    return () => document.removeEventListener("keydown", handlerOnPressEsc);
  }, [handlerOnClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handlerOnClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <div className={styles.closeButton}>
          <CloseIcon onClick={handlerOnClose} />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  handlerOnClose: propTypes.func.isRequired,
  children: propTypes.object,
};

export default Modal;
