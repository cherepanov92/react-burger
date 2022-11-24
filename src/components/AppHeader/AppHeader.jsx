import React from 'react';
import classNames from 'classnames';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './AppHeader.module.css';

const CONSTRUCTOR = 'constructor';
const ORDER_QUEUE = 'orderQueue';
const LK = 'lk';

const getIcon = (type, isActive) => {
    switch (type) {
        case CONSTRUCTOR:
            return <BurgerIcon type={isActive ? 'primary' : 'secondary'} />;
        case ORDER_QUEUE:
            return <ListIcon type={isActive ? 'primary' : 'secondary'} />;
        case LK:
            return <ProfileIcon type={isActive ? 'primary' : 'secondary'} />;
        default:
            return <p>{isActive}</p>;
    }
};

const NavItem = ({ to, text, type }) => {
    const { pathname } = useLocation();
    const isActive = to === pathname;

    return (
        <NavLink
            className={classNames(styles.navLink, 'm-2 text text_type_main-default')}
            to={to}
            exact
            activeClassName={styles.isActive}
        >
            {getIcon(type, isActive)} <span className={classNames(styles.text, 'ml-2')}>{text}</span>
        </NavLink>
    );
};

export const AppHeader = () => {
    return (
        <header className={classNames(styles.wrapper, 'p-5')}>
            <nav className={styles.nav}>
                <section className={styles.leftBlock}>
                    <NavItem to="/" text="Конструктор" type={CONSTRUCTOR} />
                    <NavItem to="/profile/orders" text="Лента заказов" type={ORDER_QUEUE} />
                </section>
                <section className={styles.centralBlock}>
                    <Logo />
                </section>
                <section className={styles.rightBlock}>
                    <NavItem to="/profile" text="Личный кабинет" type={LK} />
                </section>
            </nav>
        </header>
    );
};
