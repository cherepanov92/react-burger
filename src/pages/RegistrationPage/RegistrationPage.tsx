import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useForm } from '../../hooks/useForm';
import { registrationUser } from '../../services/actions/User';
import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';
import { useAppDispatch, useAppSelector } from '../../services/reducers/Root';

interface RegistrationFormData {
    email: { value: string };
    password: { value: string };
    name: { value: string };
}

const RegistrationPage: FC<{ isAuth: boolean }> = ({ isAuth }) => {
    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const registrationHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password, name } = e.target as typeof e.target & RegistrationFormData;
        // @ts-ignore
        dispatch(registrationUser(email.value, password.value, name.value));
    };

    if (isAuth) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    } else {
        return (
            <SinglePageWrapper>
                <p className="text text_type_main-medium">Регистрация</p>
                <form onSubmit={registrationHandler}>
                    <div className="mt-6">
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={handleChange}
                            value={values.name}
                            name={'name'}
                            size={'default'}
                            autoComplete="on"
                        />
                    </div>
                    <div className="mt-6">
                        <EmailInput onChange={handleChange} value={values.email} name={'email'} autoComplete="on" />
                    </div>
                    <div className="mt-6">
                        <PasswordInput
                            onChange={handleChange}
                            value={values.password}
                            name={'password'}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mt-6">
                        <Button type="primary" size="large" htmlType="submit">
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
                <AdditionalLink
                    className={'mt-20'}
                    label="Уже зарегистрированы?"
                    to="/login"
                    lintText="Войти"
                    replace
                />
            </SinglePageWrapper>
        );
    }
};

const RegistrationPageContainer = () => {
    const user = useAppSelector(state => state.user);
    return user ? <RegistrationPage isAuth={!!user.data} /> : null;
};

export default RegistrationPageContainer;
