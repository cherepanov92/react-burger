import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import styles from './ProfilePage.module.css';
import { getUserData } from '../../services/actions/User';

const ProfileNavLink = ({ to, text }) => {
    return (
        <NavLink to={to} className={styles.label} activeClassName={styles.activeLabel} exact>
            <div className={styles.labelWrapper}>
                <p className="text text_type_main-medium">{text}</p>
            </div>
        </NavLink>
    );
};

const ProfileInput = ({ placeholder, onChange, value, type }) => {
    return (
        <section className={classNames(styles.section, 'mt-6')}>
            <Input
                type={type}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                value={value}
                size={'default'}
                icon={'EditIcon'}
            />
        </section>
    );
};

const ProfilePage = ({ name, email }) => {
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState('');

    return (
        <div className={styles.wrapper}>
            <section className="mr-15 mt-30">
                <ProfileNavLink to={'/profile'} text={'Профиль'} />
                <ProfileNavLink to={'/profile/orders'} text={'История заказов'} />
                <ProfileNavLink to={'/'} text={'Выход'} />
                <div className={classNames(styles.navHint, 'mt-20')}>
                    <p className="text text_type_main-default">
                        В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
                    </p>
                </div>
            </section>
            <section className="mt-25">
                <ProfileInput type={'text'} placeholder={'Имя'} onChange={setNewName} value={newName} />
                <ProfileInput type={'text'} placeholder={'Логин'} onChange={setNewEmail} value={newEmail} />
                <ProfileInput type={'password'} placeholder={'Пароль'} onChange={setNewPassword} value={newPassword} />
            </section>
        </div>
    );
};

const ProfilePageContainer = () => {
    const dispatch = useDispatch();
    const { name, email, userRequest } = useSelector(state => state.user);

    const init = () => {
        dispatch(getUserData());
    };

    useEffect(init, [dispatch]);

    if (userRequest === false) {
        return <ProfilePage name={name} email={email} />;
    }

    return (
        <div className={styles.wrapper}>
            {userRequest !== false ? (
                <p className="text text_type_main-large m-10">Загрузка...</p>
            ) : (
                <ProfilePage name={name} email={email} />
            )}
        </div>
    );
};

export default ProfilePageContainer;