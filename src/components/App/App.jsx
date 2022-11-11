import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { AppHeader } from '../AppHeader';
import { getModal } from '../../utils/helpers';
import { getUserData } from '../../services/actions/User';
import Modal from '../Modal/Modal';
import ConstructorPage from '../../pages/ConstructorPage/ConstructorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const { modalType } = useSelector(state => state.modal);
    const [isUserLoaded, setUserLoaded] = useState(false);
    const background = location.state && location.state.background;
    const handleModalClose = () => {
        history.goBack();
    };

    const init = useCallback(async () => {
        await dispatch(getUserData());
        setUserLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <div className="App">
            <AppHeader />
            <Switch location={background || location}>
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
                <Route path="/ingredients/:ingredientId" exact>
                    <IngredientDetails />
                </Route>
                <Route path="/" exact>
                    <ConstructorPage />
                </Route>
                {/*<Route>*/}
                {/*    <NotFound404 />*/}
                {/*</Route>*/}
            </Switch>

            {background && (
                <Route
                    path="/ingredients/:ingredientId"
                    children={
                        <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                            <IngredientDetails useModal />
                        </Modal>
                    }
                />
            )}

            {modalType && getModal(modalType)}
        </div>
    );
}

export default App;
