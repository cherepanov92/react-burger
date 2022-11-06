import React, { useState } from 'react';
import classNames from 'classnames';
import styles from '../ProfilePage.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

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

const Profile = () => {
    const { data } = useSelector(state => state.user);
    const [newName, setNewName] = useState(data.name);
    const [newEmail, setNewEmail] = useState(data.email);
    const [newPassword, setNewPassword] = useState('');
    return (
        <section className="mt-25">
            <ProfileInput type={'text'} placeholder={'Имя'} onChange={setNewName} value={newName} />
            <ProfileInput type={'text'} placeholder={'Логин'} onChange={setNewEmail} value={newEmail} />
            <ProfileInput type={'password'} placeholder={'Пароль'} onChange={setNewPassword} value={newPassword} />
        </section>
    );
};

export default Profile;