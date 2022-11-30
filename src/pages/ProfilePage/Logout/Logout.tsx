import React, { FC, useCallback } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser } from '../../../services/actions/User';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Logout: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = useCallback(() => {
        history.replace({ pathname: '/' });
    }, [history]);

    const logoutHandler = async (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        // @ts-ignore
        await dispatch(logoutUser());
        await onLogout();
    };

    return (
        <section className="mt-25">
            <Button type="primary" size="large" htmlType="button" onClick={logoutHandler}>
                Выйти
            </Button>
        </section>
    );
};

export default Logout;
