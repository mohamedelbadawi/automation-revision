import { test } from "@fixtures/index";
import { getCardData } from "../../src/data/cards";
import { getPriceWithoutCurrency } from "../../src/helpers/helper";

test.describe('Place order', () => {

    test('TC14: Place Order: Register while Checkout', async ({
        newUser, homePage, cartPage, authPage, signupPage, checkoutPage, paymentPage, orderPlacedPage,
    }) => {
        const product = homePage.nthProductCard(1);
        let productName = '';
        let productPrice = 0;

        await test.step('Add a product to cart', async () => {
            await homePage.open();
            productName = await product.getProductName();
            productPrice = getPriceWithoutCurrency(await product.getProductPrice());
            await product.addToCart();
            await homePage.addedToCartModal.viewCart();
            await cartPage.expectLoaded();
        });

        await test.step('Register from checkout', async () => {
            await cartPage.clickCheckout();
            await cartPage.checkoutLoginModal.clickRegisterLogin();
            await authPage.getSigupFormComponent().signup({ name: newUser.name, email: newUser.email });
            await signupPage.fillAccountInfo(newUser);
            await signupPage.clickCreateAccount();
            await signupPage.expectAccountCreated();
            await signupPage.clickContinueButton();
            await homePage.header.expectLoggedInAs(newUser.name);
        });

        await test.step('Review and place order', async () => {
            await homePage.header.navigateTo('cart');
            await cartPage.clickCheckout();
            await checkoutPage.deliveryAddress.expectAddress(newUser);
            await checkoutPage.billingAddress.expectAddress(newUser);
            await checkoutPage.orderTable.expectProduct({ name: productName, price: productPrice, quantity: 1 });
            await checkoutPage.addComment('Please deliver in the morning');
            await checkoutPage.placeOrder();
        });

        await test.step('Pay', async () => {
            await paymentPage.pay(getCardData());
            await orderPlacedPage.expectOrderPlaced();
        });

        await test.step('Delete account', async () => {
            await orderPlacedPage.header.clickDeleteAccount();
            await signupPage.expectAccountDeleted();
            await signupPage.clickContinueButton();
        });
    });

    test('TC15: Place Order: Register before Checkout', async ({
        newUser, homePage, cartPage, authPage, signupPage, checkoutPage, paymentPage, orderPlacedPage,
    }) => {
        const product = homePage.nthProductCard(1);
        let productName = '';
        let productPrice = 0;

        await test.step('Register', async () => {
            await homePage.open();
            await homePage.header.navigateTo('login');
            await authPage.getSigupFormComponent().signup({ name: newUser.name, email: newUser.email });
            await signupPage.fillAccountInfo(newUser);
            await signupPage.clickCreateAccount();
            await signupPage.expectAccountCreated();
            await signupPage.clickContinueButton();
            await homePage.header.expectLoggedInAs(newUser.name);
        });

        await test.step('Add a product to cart', async () => {
            productName = await product.getProductName();
            productPrice = getPriceWithoutCurrency(await product.getProductPrice());
            await product.addToCart();
            await homePage.addedToCartModal.viewCart();
            await cartPage.expectLoaded();
        });

        await test.step('Review and place order', async () => {
            await cartPage.clickCheckout();
            await checkoutPage.deliveryAddress.expectAddress(newUser);
            await checkoutPage.billingAddress.expectAddress(newUser);
            await checkoutPage.orderTable.expectProduct({ name: productName, price: productPrice, quantity: 1 });
            await checkoutPage.addComment('Please deliver in the morning');
            await checkoutPage.placeOrder();
        });

        await test.step('Pay', async () => {
            await paymentPage.pay(getCardData());
            await orderPlacedPage.expectOrderPlaced();
        });

        await test.step('Delete account', async () => {
            await orderPlacedPage.header.clickDeleteAccount();
            await signupPage.expectAccountDeleted();
            await signupPage.clickContinueButton();
        });
    });

    test('TC16: Place Order: Login before Checkout', async ({
        user, homePage, cartPage, authPage, signupPage, checkoutPage, paymentPage, orderPlacedPage,
    }) => {
        const product = homePage.nthProductCard(1);
        let productName = '';
        let productPrice = 0;

        await test.step('Login', async () => {
            await homePage.open();
            await homePage.header.navigateTo('login');
            await authPage.getLoginFormComponent().login({ email: user.email, password: user.password });
            await homePage.header.expectLoggedInAs(user.name);
        });

        await test.step('Add a product to cart', async () => {
            productName = await product.getProductName();
            productPrice = getPriceWithoutCurrency(await product.getProductPrice());
            await product.addToCart();
            await homePage.addedToCartModal.viewCart();
            await cartPage.expectLoaded();
        });

        await test.step('Review and place order', async () => {
            await cartPage.clickCheckout();
            await checkoutPage.deliveryAddress.expectAddress(user);
            await checkoutPage.billingAddress.expectAddress(user);
            await checkoutPage.orderTable.expectProduct({ name: productName, price: productPrice, quantity: 1 });
            await checkoutPage.addComment('Please deliver in the morning');
            await checkoutPage.placeOrder();
        });

        await test.step('Pay', async () => {
            await paymentPage.pay(getCardData());
            await orderPlacedPage.expectOrderPlaced();
        });

        await test.step('Delete account', async () => {
            await orderPlacedPage.header.clickDeleteAccount();
            await signupPage.expectAccountDeleted();
            await signupPage.clickContinueButton();
        });
    });
});
