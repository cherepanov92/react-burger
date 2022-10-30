import React from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';
import { passwordReset, passwordResetConfirmation } from '../../utils/api';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const getStepContent = step => {
    switch (step) {
        case 'email':
            return <EmailConformation />;
        case 'password':
            return <PasswordConformation />;
        default:
            return <EmailConformation />;
    }
};

const PasswordConformation = () => {
    const [token, setToken] = React.useState('');
    const [password, setPassword] = React.useState('');
    const passwordConformationHandler = () => passwordResetConfirmation(password, token);

    return (
        <>
            <section className="mt-6">
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'Введите новый пароль'}
                />
            </section>
            <section className="mt-6">
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setToken(e.target.value)}
                    value={token}
                    name={'Имя'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="button" onClick={passwordConformationHandler}>
                    Сохранить
                </Button>
            </section>
        </>
    );
};

const EmailConformation = () => {
    const [email, setEmail] = React.useState('');
    const emailConformationHandler = () => passwordReset(email);

    return (
        <>
            <section className="mt-6">
                <EmailInput onChange={e => setEmail(e.target.value)} value={email} name={'email'} />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="button" onClick={emailConformationHandler}>
                    Восстановить
                </Button>
            </section>
        </>
    );
};

const ResetPasswordPage = ({ step, isAuth }) => {
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
                <p className="text text_type_main-medium">Восстановление пароля</p>
                {getStepContent(step)}
                <AdditionalLink className={'mt-20'} label="Вспомнили пароль?" to="/login" lintText="Войти" replace />
            </SinglePageWrapper>
        );
    }
};

const ResetPasswordPageContainer = ({ step }) => {
    const user = useSelector(state => state.user);
    return user ? <ResetPasswordPage isAuth={!!user.data} step={step} /> : null;
};

export default ResetPasswordPageContainer;