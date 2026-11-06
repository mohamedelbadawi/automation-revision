import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";

export class ProductDetailsPage extends BasePage {
    private readonly price: Locator;
    private readonly productName: Locator;
    private readonly category: Locator;
    private readonly availability: Locator;
    private readonly condition: Locator;
    private readonly brand: Locator;
    private readonly productInfo: Locator;
    constructor(page: Page) {
        super(page);
        this.productInfo = this.page.locator(".product-information");
        this.productName = this.productInfo.locator("h2")
        this.price = this.productInfo.locator("span span");
        this.category = this.productInfo.getByText("Category:");
        this.availability = this.productInfo.getByText("Availability:");
        this.condition = this.productInfo.getByText("Condition:");
        this.brand = this.productInfo.getByText("Brand:")
    }

    async expectProductNameIsVisible() {
        await expect(this.productName).toBeVisible();
    }

    async expectPriceIsVisible() {
        await expect(this.price).toBeVisible();
    }

    async expectCategoryIsVisible() {
        await expect(this.category).toBeVisible();
    }

    async expectAvailabilityIsVisible() {
        await expect(this.availability).toBeVisible();
    }

    async expectConditionIsVisible() {
        await expect(this.condition).toBeVisible();
    }

    async expectBrandIsVisible() {
        await expect(this.brand).toBeVisible();
    }

    async expectAllElementsAreVisible() {
        await this.expectProductNameIsVisible();
        await this.expectPriceIsVisible();
        await this.expectCategoryIsVisible();
        await this.expectAvailabilityIsVisible();
        await this.expectConditionIsVisible();
        await this.expectBrandIsVisible();
    }

}