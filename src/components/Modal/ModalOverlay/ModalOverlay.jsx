import React from 'react';
import styles from './ModalOverlay.module.css';
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");

const ModalOverlay = ({ onClose, children }) => {
    return ReactDOM.createPortal(
        <>
            <div className={ styles.wrapper } onClick={onClose}>
                {children}
            </div>
        </>,
        modalRoot
    );
}

export default ModalOverlay