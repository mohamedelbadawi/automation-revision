import { test } from "@fixtures/index";
import { getPriceWithoutCurrency } from "../../src/helpers/helper";
import { AddedToCartModalComponent } from "../../src/ui/components/shared/AddedToCartModalComponent";
import { getUserData } from "../../src/data/users";

test("TC12: Add products to cart", async ({ homePage, productsPage, cartPage, page }) => {
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.header.navigateTo('products');
    await productsPage.expectLoaded();
    const firstProduct = productsPage.nthProductCard(1);
    const secondProduct = productsPage.nthProductCard(2);

    const products: { name: string, price: number }[] = [
        { name: await firstProduct.getProductName(), price: getPriceWithoutCurrency(await firstProduct.getProductPrice()) },
        { name: await secondProduct.getProductName(), price: getPriceWithoutCurrency(await secondProduct.getProductPrice()) }
    ]

    await firstProduct.addToCart();

    await productsPage.addedToCartModal.continueShopping();

    await secondProduct.addToCart();
    await productsPage.addedToCartModal.viewCart()
    await cartPage.expectLoaded();
    await cartPage.cartTable.expectProduct({ name: products[0].name, price: products[0].price, quantity: 1 });
    await cartPage.cartTable.expectProduct({ name: products[1].name, price: products[1].price, quantity: 1 });
})

test("TC13:Verify Product quantity in Cart", async ({ homePage, cartPage, productDetailsPage, page }) => {
    await homePage.open();
    const product = homePage.nthProductCard(1);
    const productName = await product.getProductName();
    const productPrice = await product.getProductPrice();
    await product.viewProduct();
    await productDetailsPage.updateQuantity(4);
    await productDetailsPage.addToCart();
    await productDetailsPage.addedToCartModal.viewCart();
    await cartPage.cartTable.expectProduct({ name: productName, price: getPriceWithoutCurrency(productPrice), quantity: 4 });
})

test("TC:17 Verify that user can remove product from cart", async ({ homePage, cartPage, page }) => {
    await homePage.open();
    const product = homePage.nthProductCard(1);
    const productName = await product.getProductName();
    const productPrice = await product.getProductPrice();
    await product.addToCart();
    await homePage.addedToCartModal.continueShopping();
    const secondProduct = homePage.nthProductCard(2)
    const secondProductName = await secondProduct.getProductName();
    const secondProductPrice = await secondProduct.getProductPrice();
    await secondProduct.addToCart();
    await homePage.addedToCartModal.viewCart();
    await cartPage.expectLoaded();
    await cartPage.cartTable.expectProduct({ name: productName, price: getPriceWithoutCurrency(productPrice), quantity: 1 });
    await cartPage.cartTable.removeProduct(productName);
    await cartPage.cartTable.expectProductNotExist(productName);
    await cartPage.cartTable.expectProduct({ name: secondProductName, price: getPriceWithoutCurrency(secondProductPrice), quantity: 1 });
})

test("TC:20 Search Products and Verify Cart After Login", async ({ page, homePage, productsPage, cartPage, authPage, user }) => {
    await homePage.open();
    await homePage.header.navigateTo('products');
    await productsPage.expectLoaded();
    await productsPage.search('blue');
    await productsPage.expectSearchedProductsHeading();
    const firstProduct = productsPage.nthProductCard(1);
    const firstProductPrice = await firstProduct.getProductPrice();
    const firstProductName = await firstProduct.getProductName();
    await firstProduct.addToCart();
    await homePage.addedToCartModal.viewCart();
    await cartPage.cartTable.expectProduct({ name: firstProductName, price: getPriceWithoutCurrency(firstProductPrice), quantity: 1 });

    await cartPage.expectLoaded();
    await cartPage.header.navigateTo('login');

    await authPage.getLoginFormComponent().login(user);
    await homePage.header.expectLoggedInAs(user.name);
    await homePage.header.navigateTo('cart');
    await cartPage.expectLoaded();
    await cartPage.cartTable.expectProduct({ name: firstProductName, price: getPriceWithoutCurrency(firstProductPrice), quantity: 1 });
})