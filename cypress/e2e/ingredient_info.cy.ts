import { INGREDIENT_WRAPPER } from '../e2e.helpers';

describe('Проверка информации о ингредиенте', function () {
    it('Открытие ингредиента модалкой', function () {
        cy.visit('');
        cy.get(INGREDIENT_WRAPPER).first().as('ingredient');

        cy.contains('Соберите бургер');
        cy.get('@ingredient').click();

        cy.contains('Детали ингредиента');
        cy.get('#close_modal').click();
    });

    it('Открытие ингредиента страницей', function () {
        cy.visit('ingredients/60d3b41abdacab0026a733c6');
        cy.contains('Краторная булка N-200i');
    });
});