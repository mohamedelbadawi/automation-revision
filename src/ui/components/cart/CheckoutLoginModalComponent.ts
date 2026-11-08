import { Locator, Page } from "@playwright/test";

// Shown when a guest clicks "Proceed To Checkout"
export class CheckoutLoginModalComponent {
    private readonly root: Locator;

    constructor(page: Page) {
        this.root = page.locator('#checkoutModal');
    }

    async clickRegisterLogin() {
        await this.root.getByRole('link', { name: 'Register / Login' }).click();
    }
}
