import React from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';

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
    const [code, setCode] = React.useState('');
    const [password, setPassword] = React.useState('');

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
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    name={'Имя'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="button">
                    Сохранить
                </Button>
            </section>
        </>
    );
};

const EmailConformation = () => {
    const [email, setEmail] = React.useState('');

    return (
        <>
            <section className="mt-6">
                <EmailInput onChange={e => setEmail(e.target.value)} value={email} name={'email'} />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="button">
                    Восстановить
                </Button>
            </section>
        </>
    );
};

const ResetPasswordPage = () => {
    return (
        <SinglePageWrapper>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            {getStepContent('password')}
            <AdditionalLink className={'mt-20'} label="Вспомнили пароль?" to="/login" lintText="Войти" replace />
        </SinglePageWrapper>
    );
};

export default ResetPasswordPage;