import { Locator, Page, expect } from "@playwright/test";
import { HeaderComponent } from "../components/shared/HeaderComponent";
import { BasePage } from "./BasePage";
import { AddedToCartModalComponent } from "../components/shared/AddedToCartModalComponent";
import { ProductCardComponent } from "../components/product/ProductCardComponent";

export class HomePage extends BasePage {

    readonly addedToCartModal: AddedToCartModalComponent;
    readonly cards: Locator;
    constructor(page: Page) {
        super(page);
        this.addedToCartModal = new AddedToCartModalComponent(page);
        this.cards = this.page.locator('.product-image-wrapper');
    }


    async open() {
        await this.page.goto('/');
    }
    async expectLoaded() {
        await expect(this.page).toHaveURL('');
    }

    nthProductCard(index: number) {
        return new ProductCardComponent(this.cards.nth(index - 1));
    }
}