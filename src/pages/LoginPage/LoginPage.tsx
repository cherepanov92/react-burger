import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';
import { loginUser } from '../../services/actions/User';
import { useForm } from '../../hooks/useForm';
import { locationProps } from '../../utils/types';
import SinglePageWrapper from '../SinglePageWrapper';

const LoginPage: FC<{ isAuth: boolean }> = ({ isAuth }) => {
    const dispatch = useDispatch();
    const location = useLocation() as unknown as locationProps;
    const locationState = location.state;

    const { values, handleChange, setValues } = useForm({
        email: '',
        password: ''
    });

    // @ts-ignore
    const enterHandler = async e => {
        e.preventDefault();
        setValues({
            ...values
        });

        // @ts-ignore
        await dispatch(loginUser(e.target.email.value, e.target.password.value));
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
    // @ts-ignore
    const user = useSelector(state => state.user);
    return user ? <LoginPage isAuth={!!user.data} /> : null;
};

export default LoginPageContainer;
