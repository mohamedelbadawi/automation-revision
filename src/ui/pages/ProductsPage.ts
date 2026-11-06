import { Locator, Page } from "playwright";
import { ProductCardComponent } from "../components/product/ProductCardComponent";
import { HeaderComponent } from "../components/shared/HeaderComponent";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";

export class ProductsPage extends BasePage {
    private readonly allProductsHeading: Locator;
    private readonly cards: Locator;
    constructor(page: Page) {
        super(page);
        this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
        this.cards = page.locator('.product-image-wrapper');
    }

    async expectLoaded() {
        await expect(this.allProductsHeading).toBeVisible();
    }
    nthProductCard(index: number) {
        return new ProductCardComponent(this.cards.nth(index - 1));
    }



}
