import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { readFile } from "fs/promises";

export class OrderPlacedPage extends BasePage {
    private readonly orderPlacedAlert: Locator;
    private readonly orderConfirmationSuccessAlert: Locator;
    private readonly downloadInvoiceButton: Locator;
    constructor(page: Page) {
        super(page);
        this.orderPlacedAlert = this.page.getByTestId('order-placed');
        this.orderConfirmationSuccessAlert = this.page.getByText('Congratulations! Your order has been confirmed!');
        this.downloadInvoiceButton = this.page.getByRole("link", { name: "Download Invoice" });
    }

    async expectOrderPlaced() {
        await expect(this.orderPlacedAlert).toHaveText('Order Placed!');
        await expect(this.orderConfirmationSuccessAlert).toBeVisible();
    }
    async downloadAndExpectInvoice(customerName: string, total: number) {
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadInvoiceButton.click();
        const download = await downloadPromise;

        const content = await readFile(await download.path(), 'utf-8');
        expect(content).toContain(customerName);
        expect(content).toContain(String(total));
    }
}
