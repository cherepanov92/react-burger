import { NavLinkProps } from 'react-router-dom';
import { APPEND_ERROR_MODAL_TYPE } from '../services/actions/Modal';

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
    orderId: number;
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

type UserDataProps = {
    password: string;
    token: string;
};

export type UserAuthProps = {
    refreshToken: string;
    accessToken: string;
    user?: UserDataProps;
};

export interface IError {
    readonly type: typeof APPEND_ERROR_MODAL_TYPE;
    message: String;
}

export interface IIngredientList {
    [index: string]: IngredientType;
}
