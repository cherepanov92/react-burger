import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteProps } from 'react-router';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    // @ts-ignore
    const user = useSelector(state => state.user);
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
