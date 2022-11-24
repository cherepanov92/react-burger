import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
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
