import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modal");

const Modal = ({ handlerOnClose, children }) => {
  const onClose = useCallback(() => handlerOnClose(), [handlerOnClose]);

  useEffect(() => {
    const handlerOnPressEsc = (event) => event.key === "Escape" && onClose();

    document.addEventListener("keydown", handlerOnPressEsc);

    return () => document.removeEventListener("keydown", handlerOnPressEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <div className={styles.closeButton}>
          <CloseIcon onClick={onClose} />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  handlerOnClose: propTypes.func.isRequired,
  children: propTypes.any,
};

export default Modal;
