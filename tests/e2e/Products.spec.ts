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

test("TC21: Add review on product", async ({ page, homePage, productsPage, productDetailsPage }) => {
    await homePage.open();
    await homePage.header.navigateTo("products");
    await productsPage.expectLoaded();
    await productsPage.nthProductCard(1).viewProduct();
    await productDetailsPage.reviewFormComponent.expectReviewSectionHeader();
    await productDetailsPage.reviewFormComponent.fillReviewForm("John Doe", "m@m.com", "This is a great product");
    await productDetailsPage.reviewFormComponent.submitReview();
    await productDetailsPage.reviewFormComponent.expectReviewSubmittedSuccessfully();
})

test("TC22: Add to cart from Recommended items", async ({ homePage, cartPage }) => {
    await homePage.open();
    await homePage.scrollToBottom();
    const product = homePage.recommendedItemsComponent.nthProductCard(1);
    const productName = await product.getProductName();
    const productPrice = await product.getProductPrice();
    await product.addToCart();
    await homePage.addedToCartModal.viewCart();
    await cartPage.expectLoaded();
    await cartPage.cartTable.expectProduct({ name: productName, price: getPriceWithoutCurrency(productPrice), quantity: 1 })

})