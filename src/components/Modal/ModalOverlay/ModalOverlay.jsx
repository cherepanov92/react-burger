import React from 'react';
import PropTypes from "prop-types";

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ onClose, children }) => {
    return (
        <div className={ styles.wrapper } onClick={onClose}>
            {children}
        </div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default ModalOverlay