import { Locator } from "playwright";

export class ProductCardComponent {
    private readonly addToCartButton: Locator;
    private readonly viewPorduct: Locator;
    private readonly productName: Locator;
    constructor(private readonly root: Locator) {
        this.addToCartButton = root.getByRole('link', { name: 'Add to cart' })
        this.viewPorduct = root.getByRole('link', { name: 'View product' })
        this.productName = root.locator(".productinfo p")
    }
    async getProductName(): Promise<string> {
        return (await this.productName.textContent()) as string;
    }
    async addToCart() {
        await this.addToCartButton.click();
    }
    async viewProduct() {
        await this.viewPorduct.click();
    }
}