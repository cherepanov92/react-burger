import { NavLinkProps } from 'react-router-dom';

export type ingredientType = {
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

export interface orderedIngredient extends ingredientType {
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

export type locationProps = {
    state: {
        from: Location;
        isEmailConfirm: boolean;
    };
};

export type navItemProps = Pick<NavLinkProps, 'to'> & { text: string };
