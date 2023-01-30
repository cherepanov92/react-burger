import React, { FC, useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../services/reducers/Root';
import { getUserData } from '../../services/actions/User';

const ProtectedRoute: FC<RouteProps & { children?: React.ReactNode }> = ({ children, ...rest }) => {
    const user = useAppSelector(state => state.user);
    const isAuth = !!user.data;
    const dispatch = useAppDispatch();

    const [isChecked, setIsChecked] = useState(false);

    const init = useCallback(async () => {
        await dispatch(getUserData());
        setIsChecked(true);
    }, [dispatch]);

    useEffect(() => {
        if (!isAuth && !user.needAuth) {
            init();
        } else {
            setIsChecked(true);
        }
    }, [init, isAuth, user.needAuth]);

    if (isChecked) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    user.needAuth ? (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    ) : (
                        children
                    )
                }
            />
        );
    }
    return <p>зАгрузка</p>;
};

export default ProtectedRoute;
