import React, { FC, useRef } from 'react';
import classNames from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ConstructorIngredient.module.css';
import { MOVE_INGREDIENT, REMOVE_INGREDIENT } from '../../../services/actions/Constructor';
import { OrderedIngredient } from '../../../utils/types';
import { useAppDispatch } from '../../../services/reducers/Root';

export const ConstructorIngredient: FC<{ ingredient: OrderedIngredient }> = ({ ingredient }) => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLLIElement>(null);
    const onDeleteIngredient = (ingredient: OrderedIngredient) => {
        dispatch({
            type: REMOVE_INGREDIENT,
            ingredient: ingredient
        });
    };

    const moveCard = (ingredient: OrderedIngredient, oldIndex: number, newIndex: number) => {
        dispatch({
            type: MOVE_INGREDIENT,
            ingredient,
            oldIndex,
            newIndex
        });
    };

    const [, drop] = useDrop({
        accept: 'movedIngredient',
        hover(item: OrderedIngredient, monitor: any) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.orderIndex;
            const hoverIndex = ingredient.orderIndex;

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(item, dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    });

    const [, drag] = useDrag({
        type: 'movedIngredient',
        item: () => {
            return ingredient;
        },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div ref={ref as React.MutableRefObject<null>} className={classNames(styles.ingredient, 'mr-2')}>
            <div>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => onDeleteIngredient(ingredient)}
            />
        </div>
    );
};
