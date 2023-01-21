import React, { useCallback, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { AppHeader } from '../AppHeader';
import { getUserData } from '../../services/actions/User';
import { getIngredientsData } from '../../services/actions/Ingredients';
import { EnumModalType, EnumResetPassportStepType } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/reducers/Root';

import Modal from '../Modal/Modal';
import ConstructorPage from '../../pages/ConstructorPage/ConstructorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../BurgerConstructor/OrderDetails/OrderDetails';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import FeedPage from '../../pages/FeedPage/FeedPage';
import OrderItem from '../OrderListItem/OrderItem/OrderItem';

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
    const dispatch = useAppDispatch();
    const location = useLocation<Location>();
    const history = useHistory();

    const { modalType, ingredientList } = useAppSelector(state => ({
        modalType: state.modal.modalType,
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
                <Route path="/feed" exact>
                    <FeedPage />
                </Route>
                <Route path="/feed/:id" exact>
                    <FeedPage isSinglePage />
                </Route>
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

            {background?.pathname === '/' && (
                <Route
                    path="/ingredients/:ingredientId"
                    children={
                        <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                            <IngredientDetails />
                        </Modal>
                    }
                />
            )}

            {['/feed', '/profile/orders'].includes(background?.pathname) && (
                <Route
                    path={`${background.pathname}/:id`}
                    children={
                        <Modal title={''} onClose={handleModalClose}>
                            <OrderItem isModal />
                        </Modal>
                    }
                />
            )}

            {modalType && getModal(modalType)}
        </div>
    );
}

export default App;
