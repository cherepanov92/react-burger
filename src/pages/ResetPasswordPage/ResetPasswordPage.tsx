import React, { FC } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import SinglePageWrapper from '../SinglePageWrapper';
import AdditionalLink from '../../components/AdditionalLink/AdditionalLink';
import { passwordReset, passwordResetConfirmation } from '../../utils/api';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { EnumResetPassportStepType, locationProps } from '../../utils/types';

const getStepContent = (step: EnumResetPassportStepType) => {
    switch (step) {
        case EnumResetPassportStepType.EMAIL:
            return <EmailConformation />;
        case EnumResetPassportStepType.PASSWORD:
            return <PasswordConformation />;
        default:
            return <EmailConformation />;
    }
};

const PasswordConformation = () => {
    const history = useHistory();
    const location = useLocation() as unknown as locationProps;
    const isEmailConfirm = !!location.state?.isEmailConfirm;

    const { values, handleChange } = useForm({
        token: '',
        password: ''
    });

    const passwordConformationHandler = (e: any) => {
        e.preventDefault();
        passwordResetConfirmation(e.target.password.value, e.target.token.value).then(() =>
            history.replace({ pathname: '/' })
        );
    };

    if (isEmailConfirm) {
        return (
            <form onSubmit={passwordConformationHandler}>
                <div className="mt-6">
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
                        name={'password'}
                        autoComplete={'off'}
                    />
                </div>
                <div className="mt-6">
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={handleChange}
                        value={values.token}
                        name={'token'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        autoComplete={'off'}
                    />
                </div>
                <div className="mt-6">
                    <Button type="primary" size="large" htmlType="submit">
                        Сохранить
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <Redirect
            to={{
                pathname: '/forgot-password'
            }}
        />
    );
};

const EmailConformation = () => {
    const history = useHistory();
    const { values, handleChange } = useForm({
        email: ''
    });

    const emailConformationHandler = (e: any) => {
        e.preventDefault();
        passwordReset(e.target.email.value).then(() =>
            history.replace({ pathname: '/reset-password' }, { isEmailConfirm: true })
        );
    };

    return (
        <form onSubmit={emailConformationHandler}>
            <section className="mt-6">
                <EmailInput onChange={handleChange} value={values.email} name={'email'} />
            </section>
            <section className="mt-6">
                <Button type="primary" size="large" htmlType="submit">
                    Восстановить
                </Button>
            </section>
        </form>
    );
};

const ResetPasswordPage: FC<{ step: EnumResetPassportStepType; isAuth: boolean }> = ({ step, isAuth }) => {
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

const ResetPasswordPageContainer: FC<{ step: EnumResetPassportStepType }> = ({ step }) => {
    // @ts-ignore
    const user = useSelector(state => state.user);
    return user ? <ResetPasswordPage isAuth={!!user.data} step={step} /> : null;
};

export default ResetPasswordPageContainer;
