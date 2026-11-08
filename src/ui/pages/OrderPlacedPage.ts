import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderPlacedPage extends BasePage {
    private readonly orderPlacedAlert: Locator;
    private readonly orderConfirmationSuccessAlert: Locator;
    constructor(page: Page) {
        super(page);
        this.orderPlacedAlert = this.page.getByTestId('order-placed');
        this.orderConfirmationSuccessAlert = this.page.getByText('Congratulations! Your order has been confirmed!');
    }

    async expectOrderPlaced() {
        await expect(this.orderPlacedAlert).toHaveText('Order Placed!');
        await expect(this.orderConfirmationSuccessAlert).toBeVisible();
    }
}
