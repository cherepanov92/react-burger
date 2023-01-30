import { CONSTRUCTOR_WRAPPER, EnumItems, INGREDIENT_WRAPPER, TEST_EMAIL, TEST_PASSWORD } from '../e2e.helpers';
import { login } from '../../src/utils/api';

Cypress.Commands.add('addItemToConstructorWithDndAction', (item: EnumItems) => {
    cy.get(`@${EnumItems[item]}`).trigger('dragstart').trigger('dragleave');
    cy.get(CONSTRUCTOR_WRAPPER).trigger('dragenter').trigger('dragover').trigger('drop').trigger('dragend');
});

Cypress.Commands.add('removeItemOnConstructor', (item: EnumItems) => {
    cy.get(CONSTRUCTOR_WRAPPER)
        .contains('[class^=ConstructorIngredient_ingredient__]', new RegExp(`^${item}`))
        .find('[class^=constructor-element__action]')
        .click();
});

Cypress.Commands.add('getItemSet', () => {
    cy.get(INGREDIENT_WRAPPER).contains(EnumItems.basicBun).as(EnumItems[EnumItems.basicBun]);
    cy.get(INGREDIENT_WRAPPER).contains(EnumItems.secondBun).as(EnumItems[EnumItems.secondBun]);
    cy.get(INGREDIENT_WRAPPER).contains(EnumItems.sauce).as(EnumItems[EnumItems.sauce]);
    cy.get(INGREDIENT_WRAPPER).contains(EnumItems.ingredient).as(EnumItems[EnumItems.ingredient]);
});

Cypress.Commands.add('checkItemsOnConstructor', (itemsList: EnumItems[]) => {
    itemsList.forEach(item => {
        cy.get(CONSTRUCTOR_WRAPPER).contains(new RegExp(`^${item}`));
    });
});

Cypress.Commands.add('updateAccessToken', () => {
    login(TEST_EMAIL, TEST_PASSWORD);
    cy.wait(1000);
});

declare global {
    namespace Cypress {
        interface Chainable {
            addItemToConstructorWithDndAction(item: EnumItems): Chainable<void>;
            removeItemOnConstructor(item: EnumItems): Chainable<void>;
            getItemSet(): Chainable<void>;
            checkItemsOnConstructor(itemsList: EnumItems[]): Chainable<void>;
            updateAccessToken(): Chainable<void>;
        }
    }
}
