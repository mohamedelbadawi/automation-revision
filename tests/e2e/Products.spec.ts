import { test, expect } from "@fixtures/index";
test('TC8 : Verify All Products and product detail page', async ({ page, homePage, productsPage, productDetailsPage }) => {
    await homePage.open();
    await homePage.header.navigateTo('products');
    await productsPage.expectLoaded();
    await productsPage.nthProductCard(1).viewProduct();
    await productDetailsPage.expectAllElementsAreVisible();
})