import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';

import styles from './AppHeader.module.css';
import { NavLink, CONSTRUCTOR, LK, ORDER_QUEUE } from './NavLink';
import classNames from 'classnames';

export const AppHeader = () => {
    const [activePage, setActivePage] = useState(CONSTRUCTOR);

    return (
        <header className={classNames(styles.wrapper, 'p-5')}>
            <nav className={styles.nav}>
                <section className={styles.leftBlock}>
                    <NavLink
                        type={CONSTRUCTOR}
                        activeType={activePage}
                        text={'Конструктор'}
                        setActiveType={setActivePage}
                    />
                    <NavLink
                        type={ORDER_QUEUE}
                        activeType={activePage}
                        text={'Лента заказов'}
                        setActiveType={setActivePage}
                    />
                </section>
                <section className={styles.centralBlock}>
                    <Logo />
                </section>
                <section className={styles.rightBlock}>
                    <NavLink type={LK} activeType={activePage} text={'Личный кабинет'} setActiveType={setActivePage} />
                </section>
            </nav>
        </header>
    );
};
