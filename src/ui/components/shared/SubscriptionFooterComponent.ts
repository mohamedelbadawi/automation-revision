import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export class SubscriptionFooterComponent {
    private readonly footerContainer: Locator;
    private readonly emailInput: Locator;
    private readonly subscribeButton: Locator;
    private readonly subscriptionSuccessAlert: Locator;
    constructor(private page: Page) {
        this.footerContainer = this.page.locator('#footer');
        this.emailInput = this.footerContainer.locator("#susbscribe_email");
        this.subscribeButton = this.footerContainer.locator("#subscribe");
        this.subscriptionSuccessAlert = this.footerContainer.locator("#success-subscribe .alert-success");
    }
    async subscribe(email: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }
    async expectSuccessSubscription() {
        await expect(this.subscriptionSuccessAlert).toHaveText("You have been successfully subscribed!");
    }

}