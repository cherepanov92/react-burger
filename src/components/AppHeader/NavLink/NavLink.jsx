import React from 'react';
import style from './NavLink.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const CONSTRUCTOR = 'constructor';
export const ORDER_QUEUE = 'orderQueue';
export const LK = 'lk';

const getIcon = (type, isActive) => {
    switch (type) {
        case CONSTRUCTOR:
            return <BurgerIcon type={isActive === CONSTRUCTOR ? 'primary' : 'secondary'} />;
        case ORDER_QUEUE:
            return <ListIcon type={isActive === ORDER_QUEUE ? 'primary' : 'secondary'} />;
        case LK:
            return <ProfileIcon type={isActive === LK ? 'primary' : 'secondary'} />;
        default:
            return <p>{isActive}</p>;
    }
};

export const NavLink = ({ type, activeType, text, setActiveType }) => {
    return (
        <button className={classNames(style.wrapper, 'pl-4 pr-4 pb-2 pt-2')} onClick={() => setActiveType(type)}>
            {getIcon(type, activeType)}
            <span
                className={classNames(
                    style.text,
                    { [style.isActive]: type === activeType },
                    'm-2 text text_type_main-default'
                )}
            >
                {text}
            </span>
        </button>
    );
};

NavLink.propTypes = {
    type: PropTypes.string.isRequired,
    activeType: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    setActiveType: PropTypes.func.isRequired
};
