import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main', 'sauce']),
    // type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

export const orderIngredientsType = PropTypes.shape({
    bun: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    main: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    sauce: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    totalPrice: PropTypes.number.isRequired
});
