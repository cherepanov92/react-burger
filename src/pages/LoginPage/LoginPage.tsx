import React, { FC } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';
import { loginUser } from '../../services/actions/User';
import { useForm } from '../../hooks/useForm';
import { LocationProps } from '../../utils/types';
import SinglePageWrapper from '../SinglePageWrapper';
import { useAppDispatch, useAppSelector } from '../../services/reducers/Root';

interface LoginFormData {
    password: { value: string };
    email: { value: string };
}

const LoginPage: FC<{ isAuth: boolean }> = ({ isAuth }) => {
    const dispatch = useAppDispatch();
    const location = useLocation() as unknown as LocationProps;
    const locationState = location.state;

    const { values, handleChange, setValues } = useForm({
        email: '',
        password: ''
    });

    const enterHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setValues({
            ...values
        });

        const { password, email } = e.target as typeof e.target & LoginFormData;
        // @ts-ignore
        await dispatch(loginUser(email.value, password.value));
    };

    if (isAuth) {
        return <Redirect to={locationState?.from || '/'} />;
    } else {
        return (
            <SinglePageWrapper>
                <p className="text text_type_main-medium">Вход</p>
                <form onSubmit={enterHandler}>
                    <section className="mt-6">
                        <EmailInput onChange={handleChange} value={values.email} name={'email'} autoComplete="on" />
                    </section>
                    <section className="mt-6">
                        <PasswordInput
                            onChange={handleChange}
                            value={values.password}
                            name={'password'}
                            autoComplete="on"
                        />
                    </section>
                    <section className="mt-6">
                        <Button type="primary" size="large" htmlType="submit">
                            Войти
                        </Button>
                    </section>
                    <AdditionalLink
                        className={'mt-20'}
                        label="Вы — новый пользователь?"
                        to="/register"
                        lintText="Зарегистрироваться"
                        replace
                    />
                    <AdditionalLink
                        className={'mt-4'}
                        label="Забыли пароль?"
                        to="/forgot-password"
                        lintText="Восстановить пароль"
                        replace
                    />
                </form>
            </SinglePageWrapper>
        );
    }
};

const LoginPageContainer = () => {
    const user = useAppSelector(state => state.user);
    return user ? <LoginPage isAuth={!!user.data} /> : null;
};

export default LoginPageContainer;
