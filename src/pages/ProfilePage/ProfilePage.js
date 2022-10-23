import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProfilePage.module.css';

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

const ProfilePage = () => {
    const [name, setName] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <div className={styles.wrapper}>
            <section className={classNames('mr-15', 'mt-30')}>
                <ProfileNavLink to={'/profile'} text={'Профиль'} />
                <ProfileNavLink to={'/profile/orders'} text={'История заказов'} />
                <ProfileNavLink to={'/'} text={'Выход'} />
                <div className={classNames(styles.navHint, 'mt-20')}>
                    <p className="text text_type_main-default">
                        В&nbsp;этом разделе вы&nbsp;можете изменить&nbsp;свои персональные данные
                    </p>
                </div>
            </section>
            <section className={classNames('mt-25')}>
                <ProfileInput type={'text'} placeholder={'Имя'} onChange={setName} value={name} />
                <ProfileInput type={'text'} placeholder={'Логин'} onChange={setLogin} value={login} />
                <ProfileInput type={'password'} placeholder={'Пароль'} onChange={setPassword} value={password} />
            </section>
        </div>
    );
};

export default ProfilePage;