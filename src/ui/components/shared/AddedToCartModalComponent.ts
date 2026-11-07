import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class AddedToCartModalComponent {
    private readonly root: Locator;
    private continueShoppingButton: Locator;
    private viewCartButton: Locator;
    constructor(page: Page) {
        this.root = page.locator("#cartModal");
        this.continueShoppingButton = this.root.getByRole("button", { name: "Continue Shopping" });
        this.viewCartButton = this.root.getByRole("link", { name: "View Cart" });
    }

    async continueShopping() {
        await expect(this.root).toBeVisible();
        await this.continueShoppingButton.click();
    }

    async viewCart() {
        await expect(this.root).toBeVisible();

        await this.viewCartButton.click();
    }
}