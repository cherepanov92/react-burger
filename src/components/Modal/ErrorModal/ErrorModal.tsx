import React, { FC } from 'react';
import classNames from 'classnames';

import Modal from '../Modal';
import styles from './ErrorModal.module.css';
import { REMOVE_MODAL_TYPE } from '../../../services/actions/Modal';
import { useAppDispatch, useAppSelector } from '../../../services/reducers/Root';

const ErrorModal: FC = () => {
    const dispatch = useAppDispatch();
    const { status, message } = useAppSelector(state => state.modal);

    const closeModal = () => {
        dispatch({ type: REMOVE_MODAL_TYPE });
    };

    return (
        <Modal onClose={closeModal} title={'Ошибка'}>
            <div className={classNames(styles.wrapper, 'pb-10')}>
                {status && <span className={classNames('text text_type_main-medium mt-3 mb-3')}>Статус:{status}</span>}
                {message && (
                    <span className={classNames('text text_type_main-medium mt-3 mb-3')}>Сообщение:{message}</span>
                )}
            </div>
        </Modal>
    );
};

export default ErrorModal;
