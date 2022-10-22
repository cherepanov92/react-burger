import React from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';

const RegistrationPage = () => {
    const [name, setName] = React.useState('');
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
            <p className="text text_type_main-medium">Регистрация</p>
            <section className="mt-6">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    name={'Имя'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </section>
            <section className="mt-6">
                <EmailInput onChange={onEmailChange} value={email} name={'email'} />
            </section>
            <section className="mt-6">
                <PasswordInput onChange={onPasswordChange} value={password} name={'password'} />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="button">
                    Зарегистрироваться
                </Button>
            </section>
            <AdditionalLink className={'mt-20'} label="Уже зарегистрированы?" to="/login" lintText="Войти" replace />
        </SinglePageWrapper>
    );
};

export default RegistrationPage;