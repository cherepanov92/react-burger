import React from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';

const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const onEmailChange = e => {
        setEmail(e.target.value);
    };
    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    return (
        <SinglePageWrapper>
            <p className="text text_type_main-medium">Вход</p>
            <section className="mt-6">
                <EmailInput onChange={onEmailChange} value={email} name={'email'} />
            </section>
            <section className="mt-6">
                <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="button">
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
};

export default LoginPage;