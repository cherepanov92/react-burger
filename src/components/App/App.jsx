import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AppHeader } from '../AppHeader';
import { getModal } from '../../utils/helpers';
import ConstructorPage from '../../pages/ConstructorPage/ConstructorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getUserData } from '../../services/actions/User';

function App() {
    const dispatch = useDispatch();
    const { modalType } = useSelector(state => state.modal);

    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await dispatch(getUserData());
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <div className="App">
            <Router>
                <AppHeader />
                <Switch>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>
                    <Route path="/register" exact>
                        <RegistrationPage />
                    </Route>
                    <Route path="/forgot-password" exact>
                        <ResetPasswordPage step={'email'} />
                    </Route>
                    <Route path="/reset-password" exact>
                        <ResetPasswordPage step={'password'} />
                    </Route>
                    <ProtectedRoute path="/profile">
                        <ProfilePage />
                    </ProtectedRoute>
                    <Route path="profile/orders" exact>
                        <ProfilePage />
                    </Route>
                    <Route path="/" exact>
                        <ConstructorPage />
                    </Route>
                </Switch>
            </Router>
            {modalType && getModal(modalType)}
        </div>
    );
}

export default App;
