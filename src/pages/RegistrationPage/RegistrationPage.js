import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { registrationUser } from '../../services/actions/User';
import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';

const RegistrationPage = ({ isAuth }) => {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm({
        name: '',
        email: '',
        password: ''
    });

    const registrationHandler = e => {
        e.preventDefault();
        dispatch(registrationUser(e.target.email.value, e.target.password.value, e.target.name.value));
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
    const user = useSelector(state => state.user);
    return user ? <RegistrationPage isAuth={!!user.data} /> : null;
};

export default RegistrationPageContainer;
