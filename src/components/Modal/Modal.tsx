import ReactDOM from 'react-dom';
import { FC, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Modal.module.css';
import ModalOverlay from './ModalOverlay/ModalOverlay';

const modalRoot: any = document.getElementById('modal');

type ModalProps = {
    title?: string;
    onClose: any;
};

const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
    useEffect(() => {
        // @ts-ignore
        const handleEscape = event => {
            if (event.key === 'Escape') {
                onClose(event);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // @ts-ignore
    const stopPropagation = e => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={`pt-10 pl-10 pr-10 ${styles.wrapper}`} onClick={stopPropagation}>
                <div className={styles.header}>
                    <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>
                    <button onClick={onClose} className={`pt-5 ${styles.button}`}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>
        </ModalOverlay>,
        modalRoot
    );
};

export default Modal;
