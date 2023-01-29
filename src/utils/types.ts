import { NavLinkProps } from 'react-router-dom';
import { APPEND_ERROR_MODAL_TYPE, TModalActions } from '../services/actions/Modal';
import { TIngredientActions } from '../services/actions/Constructor';
import { TIngredientDetailsActions } from '../services/actions/IngredientDetails';
import { TIngredientsActions } from '../services/actions/Ingredients';
import { TOrderActions } from '../services/actions/Order';
import { TUserActions } from '../services/actions/User';
import { TWSActions } from '../services/actions/WebSocket';
import { Action, ActionCreator } from 'redux';
import { store } from '../services/reducers/Root';
import { ThunkAction } from 'redux-thunk';
import { InitialIngredientsState } from '../services/reducers/Ingredients';
import { InitialConstructorState } from '../services/reducers/Constructor';
import { InitialIngredientDetailsState } from '../services/reducers/IngredientDetails';
import { InitialOrderState } from '../services/reducers/Order';
import { InitialModalState } from '../services/reducers/Modal';
import { InitialUserState } from '../services/reducers/User';

export type IngredientType = {
    readonly _id: string;
    readonly name: string;
    readonly type: EnumIngredientType;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
};

export enum EnumOrderStatusName {
    'created' = 'Создан',
    'pending' = 'Готовится',
    'done' = 'Готов'
}

export type OrderType = {
    readonly _id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly status: 'created' | 'pending' | 'done';
    readonly name: string;
    readonly number: number;
    readonly ingredients: string[];
};

export interface OrderedIngredient extends IngredientType {
    orderIndex: number;
    orderId: string;
    index: number;
}

export enum EnumIconType {
    CONSTRUCTOR = 'constructor',
    ORDER_QUEUE = 'orderQueue',
    LK = 'lk'
}

export enum EnumModalType {
    ERROR = 'error',
    ORDER = 'order'
}

export enum EnumIngredientType {
    BUN = 'bun',
    SAUCE = 'sauce',
    MAIN = 'main'
}

export enum EnumResetPassportStepType {
    EMAIL = 'email',
    PASSWORD = 'password'
}

export type LocationProps = {
    state: {
        from: Location;
        isEmailConfirm: boolean;
    };
};

export type NavItemProps = Pick<NavLinkProps, 'to'> & { text: string };

export type TUserInfoData = {
    email: string;
    name: string;
};

export interface IError {
    readonly type: typeof APPEND_ERROR_MODAL_TYPE;
    message: String;
}

export interface IIngredientList {
    [index: string]: IngredientType;
}

export type TInitialState = {
    ingredients?: typeof InitialIngredientsState;
    constructor: typeof InitialConstructorState;
    ingredientDetails: typeof InitialIngredientDetailsState;
    order: typeof InitialOrderState;
    modal: typeof InitialModalState;
    user: typeof InitialUserState;
};

export type TAppActions =
    | TIngredientActions
    | TIngredientDetailsActions
    | TIngredientsActions
    | TModalActions
    | TOrderActions
    | TUserActions
    | TWSActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TAppActions>>;

export interface ILocation {
    from?: string
    background?: any
    pathname?: string
}
