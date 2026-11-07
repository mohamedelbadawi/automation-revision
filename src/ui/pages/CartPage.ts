import { Page } from "playwright";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";
import { CartTableComponent } from "../components/cart/CartTableComponent";
;

export class CartPage extends BasePage {
    readonly cartTableComponenet: CartTableComponent
    constructor(page: Page) {
        super(page);
        this.cartTableComponenet = new CartTableComponent(page);
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL('view_cart');
    }
   


}