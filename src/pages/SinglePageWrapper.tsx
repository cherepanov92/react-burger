import React, { FC } from 'react';
import styles from './SinglePageWrapper.module.css';

const SinglePageWrapper: FC = ({ children }) => <div className={styles.wrapper}>{children}</div>;

export default SinglePageWrapper;
