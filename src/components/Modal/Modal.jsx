import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

const Modal  = ({ onClose, children }) => {
    useEffect(() => {
        const close = (event) => {
            if (event.key === 'Escape') {
                onClose(event);
            }
        };

        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} >
                {children}
            </ModalOverlay>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;