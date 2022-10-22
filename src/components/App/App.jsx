import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AppHeader } from '../AppHeader';
import ConstructorPage from '../../pages/ConstructorPage/ConstructorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';

function App() {
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
                    <Route path="/" exact>
                        <ConstructorPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
