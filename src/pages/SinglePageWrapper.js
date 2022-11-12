import React from 'react';
import styles from './SinglePageWrapper.module.css';

const SinglePageWrapper = ({ children }) => <div className={styles.wrapper}>{children}</div>;

export default SinglePageWrapper;
