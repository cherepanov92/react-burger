import { EnumItems } from '../e2e.helpers';

describe('Проверка работы конструктора заказов', function () {
    it('Сборка базового бургера', function () {
        cy.visit('');
        cy.getItemSet();
        cy.addItemToConstructorWithDndAction(EnumItems.basicBun);
        cy.addItemToConstructorWithDndAction(EnumItems.sauce);
        cy.addItemToConstructorWithDndAction(EnumItems.ingredient);

        cy.checkItemsOnConstructor([EnumItems.basicBun, EnumItems.sauce, EnumItems.ingredient]);
    });

    it('Сборка бургера с заменой булок', function () {
        cy.visit('');
        cy.getItemSet();
        cy.addItemToConstructorWithDndAction(EnumItems.basicBun);
        cy.addItemToConstructorWithDndAction(EnumItems.sauce);
        cy.addItemToConstructorWithDndAction(EnumItems.ingredient);

        cy.addItemToConstructorWithDndAction(EnumItems.secondBun);

        cy.checkItemsOnConstructor([EnumItems.secondBun, EnumItems.sauce, EnumItems.ingredient]);
    });

    it('Сборка бургера с удалением элемента', function () {
        cy.visit('');
        cy.getItemSet();
        cy.addItemToConstructorWithDndAction(EnumItems.basicBun);
        cy.addItemToConstructorWithDndAction(EnumItems.sauce);
        cy.addItemToConstructorWithDndAction(EnumItems.ingredient);
        cy.removeItemOnConstructor(EnumItems.ingredient);

        cy.checkItemsOnConstructor([EnumItems.basicBun, EnumItems.sauce]);
    });
});
