import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';
import { loginUser } from '../../services/actions/User';

const LoginPage = ({ isAuth }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const locationState = location.state;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const enterHandler = async e => {
        e.preventDefault();
        await dispatch(loginUser(email, password));
    };

    if (isAuth) {
        return <Redirect to={locationState?.from || '/'} />;
    } else {
        return (
            <SinglePageWrapper>
                <p className="text text_type_main-medium">Вход</p>
                <section className="mt-6">
                    <EmailInput onChange={e => setEmail(e.target.value)} value={email} name={'email'} />
                </section>
                <section className="mt-6">
                    <PasswordInput onChange={e => setPassword(e.target.value)} value={password} name={'password'} />
                </section>
                <section className="mt-6">
                    <Button type="primary" size="large" htmlType="button" onClick={enterHandler}>
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
            </SinglePageWrapper>
        );
    }
};

const LoginPageContainer = () => {
    const user = useSelector(state => state.user);
    return user ? <LoginPage isAuth={!!user.data} /> : null;
};

export default LoginPageContainer;