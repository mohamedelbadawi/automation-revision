import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CartTableComponent } from "../components/cart/CartTableComponent";
import { CheckoutLoginModalComponent } from "../components/cart/CheckoutLoginModalComponent";

export class CartPage extends BasePage {
    readonly cartTable: CartTableComponent;
    readonly checkoutLoginModal: CheckoutLoginModalComponent;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTable = new CartTableComponent(page.locator('#cart_info_table'));
        this.checkoutLoginModal = new CheckoutLoginModalComponent(page);
        this.checkoutButton = page.getByText('Proceed To Checkout');
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL('/view_cart');
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}
