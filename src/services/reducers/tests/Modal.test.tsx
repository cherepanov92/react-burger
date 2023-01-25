import React from 'react';
import renderer from 'react-test-renderer';
import modalReducer, { InitialModalState as initialState } from '../Modal';
import { APPEND_ERROR_MODAL_TYPE, APPEND_MODAL_TYPE, REMOVE_MODAL_TYPE } from '../../actions/Modal';
import { EnumModalType } from '../../../utils/types';

describe('ModalReducer:', () => {
    it('Начальное состояние', () => {
        expect(modalReducer(initialState, {} as any)).toEqual(initialState);
        const tree = renderer.create(<>Начальное состояние</>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('Добавление типа модального окна:', () => {
        it('заказ', () => {
            expect(
                modalReducer(initialState, {
                    type: APPEND_MODAL_TYPE,
                    modalType: EnumModalType.ORDER
                })
            ).toEqual({
                ...initialState,
                modalType: EnumModalType.ORDER
            });
        });

        it('ошибка', () => {
            expect(
                modalReducer(initialState, {
                    type: APPEND_MODAL_TYPE,
                    modalType: EnumModalType.ERROR
                })
            ).toEqual({
                ...initialState,
                modalType: EnumModalType.ERROR
            });
        });
    });

    describe('Добавление модального окна ошибок:', () => {
        it('все параметры', () => {
            expect(
                modalReducer(initialState, {
                    type: APPEND_ERROR_MODAL_TYPE,
                    status: '500',
                    message: 'Ошибка сервера'
                })
            ).toEqual({
                ...initialState,
                modalType: EnumModalType.ERROR,
                status: '500',
                message: 'Ошибка сервера'
            });
        });

        it('без статуса', () => {
            expect(
                modalReducer(initialState, {
                    type: APPEND_ERROR_MODAL_TYPE,
                    message: 'Ошибка сервера'
                })
            ).toEqual({
                ...initialState,
                modalType: EnumModalType.ERROR,
                status: null,
                message: 'Ошибка сервера'
            });
        });

        it('без сообщения', () => {
            expect(
                modalReducer(initialState, {
                    type: APPEND_ERROR_MODAL_TYPE,
                    status: '500',
                    message: null
                })
            ).toEqual({
                ...initialState,
                modalType: EnumModalType.ERROR,
                status: '500',
                message: null
            });
        });

        it('без статуса и сообщения', () => {
            expect(
                modalReducer(initialState, {
                    type: APPEND_ERROR_MODAL_TYPE,
                    status: null,
                    message: null
                })
            ).toEqual({
                ...initialState,
                modalType: EnumModalType.ERROR,
                status: null,
                message: null
            });
        });
    });

    it('Удаление данных о модальном окне', () => {
        expect(
            modalReducer(initialState, {
                type: REMOVE_MODAL_TYPE
            })
        ).toEqual({
            ...initialState,
            modalType: null,
            status: null
        });
    });
});
