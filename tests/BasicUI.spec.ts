import{ test, expect } from '@playwright/test';
import type {Locator} from '@playwright/test';


test.describe('basic UI tests', () => {


    let firstNameInput: Locator;
    let lastNameInput: Locator;
    let emailInput: Locator;
    let addressInput: Locator;
    let createOrderButton: Locator;
    test.beforeEach(async({page}) => {
        await page.goto('https://basic-ui.tl-academy.ee/')
        firstNameInput = page.getByTestId('first-name-input')
        lastNameInput = page.getByTestId('last-name-input')
        emailInput = page.getByTestId('email-input')
        addressInput = page.getByTestId('address-input')
        createOrderButton = page.getByTestId('create-order-button')
    })

    test('TL-16-1 create order button test', async ({ page }) => {

        await expect(createOrderButton).toBeDisabled()
        await firstNameInput.fill("Test")
        await lastNameInput.fill("Test")
        await emailInput.fill("Test@test.test")
        await expect(createOrderButton).toBeDisabled();
        await addressInput.fill("Test")
        await expect(createOrderButton).toBeEnabled();
    });

    test('TL-16-2 change language', async ({ page }) => {
        const langBtnRU= page.getByTestId('language-ru')
        const langBtnEN= page.getByTestId('language-en')
        const heading = page.getByTestId('page-title')

        const testData = {
            createOrderRu: "Создать заказ",
            createOrderEn: "Create order"
        };

        await langBtnRU.click();
        await expect(heading).toHaveText(testData.createOrderRu);
        await langBtnEN.click();
        await expect(heading).toHaveText(testData.createOrderEn);

    });

    test('TL-16-3 incorrect email blocks create button and shows error', async ({ page }) => {
        const emailErrorBlock = page.getByTestId('email-error')

        await expect(createOrderButton).toBeDisabled()
        await firstNameInput.fill("Test")
        await lastNameInput.fill("Test")
        await expect(createOrderButton).toBeDisabled();
        await addressInput.fill("Test")
        await emailInput.fill("Test@test")
        await emailInput.blur()
        await expect(emailErrorBlock).toBeVisible()
        await expect(createOrderButton).not.toBeEnabled();
    });
})

