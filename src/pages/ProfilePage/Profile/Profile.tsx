import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from '../ProfilePage.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../../services/reducers/Root';
import { patchUserData } from '../../../services/actions/User';

type ProfileInputProps = {
    placeholder: string;
    value: string;
    type: 'text' | 'email' | 'password' | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
};

const ProfileInput: FC<ProfileInputProps> = ({ placeholder, onChange, value, type, name }) => {
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
    const dispatch = useAppDispatch();
    const { data, userRequest } = useAppSelector(state => state.user);
    const { values, handleChange, setValues } = useForm({
        email: data.email,
        name: data.name,
        password: ''
    });
    const [isModify, setIsModify] = useState(false);

    const abortChangeHandler = () => {
        setValues({
            email: data.email,
            name: data.name,
            password: ''
        });
    };

    const changeUserHandler = () => {
        dispatch(patchUserData(values.email, values.password, values.name));
    };

    useEffect(() => {
        if (!values.password && JSON.stringify(values) === JSON.stringify({ ...data, password: '' })) {
            setIsModify(false);
        } else {
            setIsModify(true);
        }
    }, [data, values]);

    if (!userRequest) {
        return (
            <>
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
                    <div className={classNames(styles.section, 'mt-10')}>
                        <Button type="secondary" size="medium" htmlType="reset" onClick={abortChangeHandler}>
                            Отмена
                        </Button>
                        <Button
                            type="primary"
                            size="medium"
                            htmlType="submit"
                            disabled={!isModify}
                            onClick={changeUserHandler}
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </>
        );
    }

    return null;
};

export default Profile;
