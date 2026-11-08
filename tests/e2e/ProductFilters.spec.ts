import test from "@fixtures/index";

test("TC18: View Category Products", async ({ page, homePage, productsPage }) => {
    await homePage.open();
    await homePage.productSideBar.selectCategory("Women", "Dress");
    await productsPage.expectHeadingContain("Women - Dress");
    await productsPage.productSidebarComponent.selectCategory("Men", "Jeans");
    await productsPage.expectHeadingContain("Men - Jeans");
})
test('TC19: View & Cart Brand Products', async ({ page, homePage, productsPage }) => {
    await homePage.open();
    await homePage.header.navigateTo('products');
    await productsPage.expectLoaded();
    await productsPage.productSidebarComponent.selectBrand('Polo')
    await productsPage.expectHeadingContain('Polo');
    await productsPage.expectProductsListNotEmpty();
    await productsPage.productSidebarComponent.selectBrand('H&M');
    await productsPage.expectHeadingContain('H&M');
    await productsPage.expectProductsListNotEmpty();
})  