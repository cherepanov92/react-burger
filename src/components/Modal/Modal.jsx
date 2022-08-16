import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("modal");

const Modal  = ({ title, onClose, children }) => {
    useEffect(() => {
        const close = (event) => {
            if (event.key === 'Escape') {
                onClose(event);
            }
        };

        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, [onClose]);

    const stopPropagation = (e) => {e.stopPropagation()}

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} >
                <div className={`pt-10 pl-10 pr-10 ${styles.wrapper}`} onClick={stopPropagation}>
                    <div className={styles.header}>
                        <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>
                        <button onClick={onClose} className={`pt-5 ${styles.button}`}>
                            <CloseIcon type='primary' />
                        </button>
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;