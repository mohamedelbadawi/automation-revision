import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AddressComponent } from "../components/checkout/AddressComponent";
import { CartTableComponent } from "../components/cart/CartTableComponent";

export class CheckoutPage extends BasePage {
    readonly deliveryAddress: AddressComponent;
    readonly billingAddress: AddressComponent;
    readonly orderTable: CartTableComponent;
    private readonly commentInput: Locator;
    private readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryAddress = new AddressComponent(page.locator('#address_delivery'));
        this.billingAddress = new AddressComponent(page.locator('#address_invoice'));
        this.orderTable = new CartTableComponent(page.locator('#cart_info'));
      
        this.commentInput = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL('/checkout');
    }

    async addComment(comment: string) {
        await this.commentInput.fill(comment);
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}
