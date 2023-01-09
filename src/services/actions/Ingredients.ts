import { getIngredients } from '../../utils/api';
import { APPEND_ERROR_MODAL_TYPE } from './Modal';
import { IError, IngredientType } from '../../utils/types';
import { Dispatch } from 'react';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    items: IngredientType[];
}

interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = IGetIngredientsRequest | IGetIngredientsSuccess | IGetIngredientsFailed;

export const getIngredientsData = () => {
    return function (dispatch: Dispatch<TIngredientsActions | IError>) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getIngredients()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: res.data
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: APPEND_ERROR_MODAL_TYPE,
                    message: err.message
                });
            });
    };
};
