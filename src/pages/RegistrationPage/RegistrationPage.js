import React from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';
import { userRegister } from '../../utils/api';

const RegistrationPage = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const registrationHandler = () => {
        userRegister(email, password, name).then(r => {
            r?.success === true && console.log('NISE');
        });
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
                    size={'default'}
                />
            </section>
            <section className="mt-6">
                <EmailInput onChange={e => setEmail(e.target.value)} value={email} name={'email'} />
            </section>
            <section className="mt-6">
                <PasswordInput onChange={e => setPassword(e.target.value)} value={password} name={'password'} />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="button" onClick={registrationHandler}>
                    Зарегистрироваться
                </Button>
            </section>
            <AdditionalLink className={'mt-20'} label="Уже зарегистрированы?" to="/login" lintText="Войти" replace />
        </SinglePageWrapper>
    );
};

export default RegistrationPage;