import React, { useEffect } from "react";
import styles from "./modal.module.css";
import propTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal");
function Modal({ handlerOnClose, children }) {

    useEffect(() => {
        const handlerOnPressEsc = (event) => event.key === 'Escape' && handlerOnClose();

        document.addEventListener('keydown', handlerOnPressEsc);

        return (() => document.removeEventListener('keydown', handlerOnPressEsc));
    }, []);

    return ReactDOM.createPortal((
        <ModalOverlay onClick={handlerOnClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                {children}
                <div className={styles.closeButton}>
                    <CloseIcon onClick={handlerOnClose} />
                </div>
            </div>
        </ModalOverlay>
    ), modalRoot);
}

Modal.propTypes = {
    handlerOnClose: propTypes.func.isRequired,
    children: propTypes.object,
}

export default Modal;