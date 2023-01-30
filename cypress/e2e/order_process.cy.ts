import { EnumItems, TEST_EMAIL, TEST_PASSWORD } from '../e2e.helpers';

describe('Проверка работы совершения заказов', function () {
    it('Пользователь авторизован', function () {
        // Предварительное обновление AccessToken-а
        cy.updateAccessToken();

        cy.visit('');

        // Подготовка элементов
        cy.getItemSet();
        cy.get('[type="button"]').contains('Оформить заказ').as('SendOrderButton');

        // Сборка заказа
        cy.addItemToConstructorWithDndAction(EnumItems.basicBun);
        cy.addItemToConstructorWithDndAction(EnumItems.sauce);
        cy.addItemToConstructorWithDndAction(EnumItems.ingredient);
        cy.checkItemsOnConstructor([EnumItems.basicBun, EnumItems.sauce, EnumItems.ingredient]);

        // Отправка запроса на сборку заказа
        cy.get('@SendOrderButton').click();
        cy.wait(20000);

        cy.contains('Ваш заказ начали готовить');
        cy.get('#close_modal').click();
    });

    it('Пользователь не авторизован', function () {
        cy.visit('');

        // Подготовка элементов
        cy.getItemSet();
        cy.get('[type="button"]').contains('Оформить заказ').as('SendOrderButton');

        // Сборка заказа
        cy.addItemToConstructorWithDndAction(EnumItems.basicBun);
        cy.addItemToConstructorWithDndAction(EnumItems.sauce);
        cy.addItemToConstructorWithDndAction(EnumItems.ingredient);
        cy.checkItemsOnConstructor([EnumItems.basicBun, EnumItems.sauce, EnumItems.ingredient]);

        // Отправка запроса на сборку заказа
        cy.get('@SendOrderButton').click();

        // Закрытие модалки с ошибкой
        cy.contains('Оформить заказ может только авторизированный пользователь');
        cy.get('#close_modal').click();

        // Авторизация
        cy.get('input[name="email"]').type(TEST_EMAIL, { timeout: 3000 });
        cy.get('input[name="password"]').type(TEST_PASSWORD, { timeout: 3000 });
        cy.get('button').contains('Войти').click();

        // Повторная отправка заказа
        cy.get('@SendOrderButton').click();
        cy.wait(20000);

        cy.contains('Ваш заказ начали готовить');
        cy.get('#close_modal').click();
    });
});