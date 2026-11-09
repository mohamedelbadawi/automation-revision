import { Locator } from "playwright";
import { expect } from "playwright/test";

export class ProductCardComponent {
    private readonly addToCartButton: Locator;
    private readonly viewPorduct: Locator;
    private readonly productName: Locator;
    private readonly price: Locator;
    constructor(private readonly root: Locator) {
        this.addToCartButton = root.locator(".productinfo .add-to-cart");
        this.viewPorduct = root.getByRole('link', { name: 'View product' })
        this.productName = root.locator(".productinfo p")
        this.price = root.locator(".productinfo h2");

    }
    async getProductName() {
        return (await this.productName.textContent()) as string;
    }
    async getProductPrice() {
        return (await this.price.textContent()) as string;
    }
    async addToCart() {
        const page = this.root.page();
        await page.waitForLoadState('load');
        const added = page.waitForResponse(res => res.url().includes('/add_to_cart/'));
        await this.addToCartButton.click();
        await added;
    }
    async viewProduct() {
        await this.viewPorduct.click();
    }
}