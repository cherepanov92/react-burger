import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './AdditionalLink.module.css';

const AdditionalLink = ({ className, label, lintText, to, replace }) => {
    return (
        <section className={className}>
            <span className={classnames(styles.linkLabel, 'text text_type_main-default mr-2')}>{label}</span>{' '}
            <Link className={classnames(styles.link, 'text  text_type_main-default')} to={to} replace={replace}>
                {lintText}
            </Link>
        </section>
    );
};

export default AdditionalLink;
