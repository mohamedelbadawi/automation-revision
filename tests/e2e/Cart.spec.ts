import { test } from "@fixtures/index";
import { getPriceWithoutCurrency } from "../../src/helpers/helper";

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