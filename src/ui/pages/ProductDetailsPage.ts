import { Locator, Page } from "playwright";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";
import { AddedToCartModalComponent } from "../components/shared/AddedToCartModalComponent";
import { ReviewFormComponent } from "../components/product/ReviewFormComponent";

export class ProductDetailsPage extends BasePage {
    private readonly price: Locator;
    private readonly productName: Locator;
    private readonly category: Locator;
    private readonly availability: Locator;
    private readonly condition: Locator;
    private readonly brand: Locator;
    private readonly productInfo: Locator;
    private readonly qtyInput: Locator;
    private readonly addToCartButton: Locator;
    readonly addedToCartModal: AddedToCartModalComponent;
    readonly reviewFormComponent: ReviewFormComponent;

    constructor(page: Page) {
        super(page);
        this.productInfo = this.page.locator(".product-information");
        this.productName = this.productInfo.locator("h2")
        this.price = this.productInfo.locator("span span");
        this.category = this.productInfo.getByText("Category:");
        this.availability = this.productInfo.getByText("Availability:");
        this.condition = this.productInfo.getByText("Condition:");
        this.brand = this.productInfo.getByText("Brand:")
        this.qtyInput = this.productInfo.locator("#quantity");
        this.addToCartButton = this.productInfo.getByRole('button', { name: "Add to cart" });
        this.addedToCartModal = new AddedToCartModalComponent(this.page);
        this.reviewFormComponent = new ReviewFormComponent(this.page);
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
    async updateQuantity(qty: number) {
        await this.qtyInput.fill(qty.toString());
    }
    async addToCart() {

        await this.addToCartButton.click();
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