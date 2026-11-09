import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class ReviewFormComponent {
    private readonly root: Locator;
    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly reviewInput: Locator;
    private readonly submitButton: Locator;
    private readonly header: Locator;


    constructor(page: Page) {
        this.root = page.locator(".category-tab.shop-details-tab");
        this.nameInput = this.root.locator("#name");
        this.emailInput = this.root.locator("#email");
        this.reviewInput = this.root.locator("#review");
        this.submitButton = this.root.locator("#button-review");
        this.header = this.root.locator("li.active a");
    }

    async fillReviewForm(name: string, email: string, review: string): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.reviewInput.fill(review);
    }

    async submitReview(): Promise<void> {
        await this.submitButton.click();
    }
    async reviewSectionHeader() {
        await expect(this.header).toContainText("Write Your Review")
    }

}