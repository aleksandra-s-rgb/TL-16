import{ test, expect } from '@playwright/test';
import type {Locator} from '@playwright/test';


test.describe('shop tests', () => {

    test.beforeEach(async({page}) => {
        await page.goto('https://shop.tl-academy.ee/checkout')

    })

    test('TL-16-4 place order button test with delivery check + validation', async ({page}) => {
        const emailInput = page.getByPlaceholder('Email address')
        const fullNameInput = page.getByTestId('name-input')
        const deliveryMethodParcelCheckbox = page.getByTestId('delivery-parcel-locker-option')
        const deliveryMethodHomeCheckbox = page.getByTestId('delivery-home-option')
        const productPrice = page.getByTestId('summary-products')
        const deliveryPrice = page.getByTestId('summary-delivery')
        const totalPrice = page.getByTestId('summary-total')
        const parcelOrderBtn = page.locator("button.place")
        const nameError = page.getByTestId('name-error')
        const priceDataWithParcel = {
            Products: '€79.00',
            Delivery: '€3.99',
            Total: '€82.99'
        }
        const priceDataWithHomeDelivery = {
            Products: '€79.00',
            Delivery: '€5.99',
            Total: '€84.99'
        }

        await expect(parcelOrderBtn).toBeDisabled()
        await emailInput.fill("Test@test.test")
        await expect(parcelOrderBtn).toBeDisabled()
        await fullNameInput.fill("Test")
        await fullNameInput.blur()
        await expect(nameError).toBeVisible()
        await fullNameInput.fill("Test Test")
        await expect(parcelOrderBtn).toBeEnabled();


        await deliveryMethodHomeCheckbox.check();
        await expect(deliveryMethodHomeCheckbox).toBeAttached()
        await expect(deliveryMethodHomeCheckbox).toBeVisible()
        expect(await deliveryPrice.innerText()).toBe(priceDataWithHomeDelivery.Delivery)
        expect(await totalPrice.innerText()).toBe(priceDataWithHomeDelivery.Total)
        expect(await productPrice.innerText()).toBe(priceDataWithHomeDelivery.Products)
        console.log(`The total price is: ${await totalPrice.innerText()}`)

        await deliveryMethodParcelCheckbox.check();
        await expect(deliveryMethodParcelCheckbox).toBeAttached()
        await expect(deliveryMethodParcelCheckbox).toBeVisible()
        expect(await deliveryPrice.innerText()).toBe(priceDataWithParcel.Delivery)
        expect(await totalPrice.innerText()).toBe(priceDataWithParcel.Total)
        expect(await productPrice.innerText()).toBe(priceDataWithParcel.Products)
        console.log(`The total price is: ${await totalPrice.innerText()}`)




    });
})