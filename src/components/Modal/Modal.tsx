import ReactDOM from 'react-dom';
import { FC, MouseEvent, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Modal.module.css';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import { useHistory } from 'react-router-dom';

const modalRoot: any = document.getElementById('modal');

type ModalProps = {
    title?: string;
    onClose?: any;
};

const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
    const history = useHistory();
    const defaultCloseHandler = () => {
        history.goBack();
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose(e);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={`pt-10 pl-10 pr-10 ${styles.wrapper}`} onClick={stopPropagation}>
                <div className={styles.header}>
                    <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>
                    <button onClick={onClose ?? defaultCloseHandler} className={`pt-5 ${styles.button}`}>
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
