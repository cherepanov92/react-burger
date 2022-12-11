import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAppSelector } from '../../services/reducers/Root';

const ProtectedRoute: FC<RouteProps & { children?: React.ReactNode }> = ({ children, ...rest }) => {
    const user = useAppSelector(state => state.user);
    const isAuth = !!user.data;

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
