import { Locator, Page } from "@playwright/test";

export class AddedToCartModalComponent {
    private readonly root: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly viewCartButton: Locator;

    constructor(page: Page) {
        this.root = page.locator("#cartModal");
        this.continueShoppingButton = this.root.getByRole("button", { name: "Continue Shopping" });
        this.viewCartButton = this.root.getByRole("link", { name: "View Cart" });
    }

    // click() waits for the button to be visible and stable (fade-in done)
    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async viewCart() {
        await this.viewCartButton.click();
    }
}
