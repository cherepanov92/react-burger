import React from 'react';
import renderer from 'react-test-renderer';

import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT_USER } from '../../actions/User';
import { InitialUserState } from '../User';
import userReducer from '../User';
import { TUserInfoData } from '../../../utils/types';

const userItem: TUserInfoData = {
    email: 'test@test.te',
    name: 'test_boy'
};

const accessToken = 'iAmSuperAccessToken1337';

describe('UserReducer:', () => {
    it('Начальное состояние', () => {
        expect(userReducer(InitialUserState, {} as any)).toEqual(InitialUserState);
        const tree = renderer.create(<>Начальное состояние</>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Отправка запроса данных о пользователе', () => {
        expect(
            userReducer(InitialUserState, {
                type: GET_USER_REQUEST
            })
        ).toEqual({
            ...InitialUserState,
            userRequest: true
        });
    });

    describe('Получение данных о пользователе:', () => {
        it('С обновлением accessToken-а', () => {
            expect(
                userReducer(InitialUserState, {
                    type: GET_USER_SUCCESS,
                    data: userItem,
                    accessToken: accessToken
                })
            ).toEqual({
                ...InitialUserState,
                userRequest: false,
                data: userItem,
                accessToken: accessToken
            });
        });

        it('Без обновления accessToken-а', () => {
            expect(
                userReducer(InitialUserState, {
                    type: GET_USER_SUCCESS,
                    data: userItem,
                    accessToken: undefined
                })
            ).toEqual({
                ...InitialUserState,
                userRequest: false,
                data: userItem
            });
        });
    });

    it('Ошибка при запросе данных о пользователе', () => {
        expect(
            userReducer(InitialUserState, {
                type: GET_USER_FAILED
            })
        ).toEqual({
            ...InitialUserState,
            userFailed: true,
            userRequest: false
        });
    });

    it('Разлогирование пользователя', () => {
        expect(
            userReducer(InitialUserState, {
                type: LOGOUT_USER
            })
        ).toEqual({
            ...InitialUserState,
            data: null,
            accessToken: null
        });
    });
});
