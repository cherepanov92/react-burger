import React, { FC, MouseEventHandler } from 'react';

import styles from './ModalOverlay.module.css';

const ModalOverlay: FC<{ onClose: MouseEventHandler<HTMLDivElement> }> = ({ onClose, children }) => {
    return (
        <div className={styles.wrapper} onClick={onClose}>
            {children}
        </div>
    );
};

export default ModalOverlay;
