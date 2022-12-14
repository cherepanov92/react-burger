import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { AppHeader } from '../AppHeader';
import { getUserData } from '../../services/actions/User';
import Modal from '../Modal/Modal';
import ConstructorPage from '../../pages/ConstructorPage/ConstructorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { getIngredientsData } from '../../services/actions/Ingredients';
import { EnumModalType, EnumResetPassportStepType } from '../../utils/types';
import OrderDetails from '../BurgerConstructor/OrderDetails/OrderDetails';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';

const getModal = (modalType: EnumModalType) => {
    switch (modalType) {
        case EnumModalType.ORDER:
            return <OrderDetails />;
        case EnumModalType.ERROR:
            return <ErrorModal />;
        default:
            return null;
    }
};

function App() {
    const dispatch = useDispatch();
    const location = useLocation<Location>();
    const history = useHistory();

    const { modalType, ingredientList } = useSelector(state => ({
        // @ts-ignore
        modalType: state.modal.modalType,
        // @ts-ignore
        ingredientList: state.ingredients
    }));

    // @ts-ignore
    const background = location.state && location.state.background;
    const handleModalClose = () => {
        history.goBack();
    };

    const init = useCallback(async () => {
        // @ts-ignore
        await dispatch(getUserData());
    }, [dispatch]);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        // @ts-ignore
        dispatch(getIngredientsData());
    }, [dispatch]);

    if (ingredientList.ingredientsRequest) {
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
                    <ResetPasswordPage step={EnumResetPassportStepType.EMAIL} />
                </Route>
                <Route path="/reset-password" exact>
                    <ResetPasswordPage step={EnumResetPassportStepType.PASSWORD} />
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
                        <Modal title={'???????????? ??????????????????????'} onClose={handleModalClose}>
                            <IngredientDetails />
                        </Modal>
                    }
                />
            )}

            {modalType && getModal(modalType)}
        </div>
    );
}

export default App;
