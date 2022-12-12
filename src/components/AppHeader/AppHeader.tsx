import React, { FC } from 'react';
import classNames from 'classnames';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './AppHeader.module.css';
import { EnumIconType, NavItemProps } from '../../utils/types';

const getIcon = (type: EnumIconType, isActive: boolean): JSX.Element => {
    switch (type) {
        case EnumIconType.CONSTRUCTOR:
            return <BurgerIcon type={isActive ? 'primary' : 'secondary'} />;
        case EnumIconType.ORDER_QUEUE:
            return <ListIcon type={isActive ? 'primary' : 'secondary'} />;
        case EnumIconType.LK:
            return <ProfileIcon type={isActive ? 'primary' : 'secondary'} />;
    }
};

const NavItem: FC<NavItemProps & { type: EnumIconType }> = ({ to, text, type }) => {
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

export const AppHeader: FC = () => {
    return (
        <header className={classNames(styles.wrapper, 'p-5')}>
            <nav className={styles.nav}>
                <section className={styles.leftBlock}>
                    <NavItem to="/" text="Конструктор" type={EnumIconType.CONSTRUCTOR} />
                    <NavItem to="/feed" text="Лента заказов" type={EnumIconType.ORDER_QUEUE} />
                </section>
                <section className={styles.centralBlock}>
                    <Logo />
                </section>
                <section className={styles.rightBlock}>
                    <NavItem to="/profile" text="Личный кабинет" type={EnumIconType.LK} />
                </section>
            </nav>
        </header>
    );
};
