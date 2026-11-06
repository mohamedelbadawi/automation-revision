import { Page } from "playwright";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";
;

export class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async expectLoaded() {
        await expect(this.page).toHaveURL('view_cart');
    }
}