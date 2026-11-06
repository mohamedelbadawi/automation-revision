import test from "@fixtures/index";

test("TC 10 : Verify Subscription in home page", async ({ page, homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.subscriptionFooter.subscribe("mohamed@m.com");
    await homePage.subscriptionFooter.expectSuccessSubscription();

})
test("TC 11 : Verify Subscription in Cart page", async ({ page, homePage, cartPage }) => {
    await homePage.open();
    await homePage.header.navigateTo('cart');
    await cartPage.expectLoaded();
    await cartPage.subscriptionFooter.subscribe("mohamed@m.com");
    await cartPage.subscriptionFooter.expectSuccessSubscription();

})