import React, { useEffect } from "react";
import styles from "./modal.module.css";
import propTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";


function Modal({ handlerOnClose, modalRoot, children }) {

    useEffect(() => {
        const handlerOnPressEsc = (event) => event.key === 'Escape' && handlerOnClose();

        document.addEventListener('keydown', handlerOnPressEsc);

        return (() => document.removeEventListener('keydown', handlerOnPressEsc));
    }, []);

    return ReactDOM.createPortal((
        <ModalOverlay onClick={handlerOnClose}>
            <div className={styles.content}>
                {children}
                <div className={styles.closeButton}>
                    <CloseIcon onClick={handlerOnClose} />
                </div>
            </div>
        </ModalOverlay>
    ), modalRoot);
}

Modal.propTypes = {

}

export default Modal;