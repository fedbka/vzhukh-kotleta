import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay.tsx";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modal") as HTMLElement;

export const Modal = ({ onCloseHandler, children }: { onCloseHandler: () => void, children: JSX.Element }) => {

  const onClose = useCallback(() => onCloseHandler(), [onCloseHandler]);

  useEffect(() => {

    const handlerOnPressEsc = (event: KeyboardEvent) => event.key === "Escape" && onClose();

    document.addEventListener("keydown", handlerOnPressEsc);

    return () => document.removeEventListener("keydown", handlerOnPressEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <div className={styles.closeButton}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

