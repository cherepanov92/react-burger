import React from 'react';
import classNames from 'classnames';
import styles from '../ProfilePage.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

const ProfileInput = ({ placeholder, onChange, value, type, name }) => {
    return (
        <div className={classNames(styles.section, 'mt-6')}>
            <Input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value ?? ''}
                name={name}
                size={'default'}
                icon={'EditIcon'}
                autoComplete={'off'}
            />
        </div>
    );
};

const Profile = () => {
    const { data, userRequest } = useSelector(state => state.user);
    const { values, handleChange } = useForm({
        name: data.name,
        email: data.email,
        password: data.password
    });

    if (!userRequest) {
        return (
            <form className="mt-25">
                <ProfileInput
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={values.name}
                    name={'name'}
                />
                <ProfileInput
                    type={'text'}
                    placeholder={'Логин'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                />
                <ProfileInput
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                />
            </form>
        );
    }

    return null;
};

export default Profile;
