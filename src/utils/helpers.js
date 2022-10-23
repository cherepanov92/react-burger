import { OrderDetails } from '../components/BurgerConstructor/OrderDetails';
import { ErrorModal } from '../components/Modal/ErrorModal/ErrorModal';

export const getModal = modalType => {
    switch (modalType) {
        case 'order':
            return <OrderDetails />;
        case 'error':
            return <ErrorModal />;
        default:
            return null;
    }
};