import { test, expect } from "@fixtures/index";
import { getPriceWithoutCurrency } from "../../src/helpers/helper";
test('TC8 : Verify All Products and product detail page', async ({ page, homePage, productsPage, productDetailsPage }) => {
    await homePage.open();
    await homePage.header.navigateTo('products');
    await productsPage.expectLoaded();
    await productsPage.nthProductCard(1).viewProduct();
    await productDetailsPage.expectAllElementsAreVisible();
})

test("TC9:Search Product", async ({ page, homePage, productsPage }) => {
    await homePage.open();
    await homePage.header.navigateTo("products");
    await productsPage.expectLoaded();
    await productsPage.search("blue");
    await productsPage.expectSearchedProductsHeading();
    await productsPage.expectProductsListNotEmpty();
    await productsPage.expectAllProductsNameContain("blue")

})

