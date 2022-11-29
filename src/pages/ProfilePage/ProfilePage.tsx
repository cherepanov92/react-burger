import React, { FC } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import styles from './ProfilePage.module.css';
import Profile from './Profile/Profile';
import Orders from './Orders/Orders';
import Logout from './Logout/Logout';
import { navItemProps } from '../../utils/types';

const ProfileNavLink: FC<navItemProps> = ({ to, text }) => {
    return (
        <NavLink to={to} className={styles.label} activeClassName={styles.activeLabel} exact>
            <div className={styles.labelWrapper}>
                <p className="text text_type_main-medium">{text}</p>
            </div>
        </NavLink>
    );
};

const ProfilePage: FC = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <section className="mr-15 mt-30">
                <ProfileNavLink to={'/profile'} text={'Профиль'} />
                <ProfileNavLink to={'/profile/orders'} text={'История заказов'} />
                <ProfileNavLink to={'/profile/logout'} text={'Выход'} />
                <div className={classNames(styles.navHint, 'mt-20')}>
                    <p className="text text_type_main-default">
                        В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
                    </p>
                </div>
            </section>
            {children}
        </div>
    );
};

const ProfilePageContainer = () => {
    return (
        <div className={styles.wrapper}>
            <ProfilePage>
                <Switch>
                    <Route path="/profile" exact>
                        <Profile />
                    </Route>
                    <Route path="/profile/orders" exact>
                        <Orders />
                    </Route>
                    <Route path="/profile/logout" exact>
                        <Logout />
                    </Route>
                </Switch>
            </ProfilePage>
        </div>
    );
};

export default ProfilePageContainer;
