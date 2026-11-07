import { Locator, Page } from "playwright";
import { getPriceWithoutCurrency } from "../../../helpers/helper";
import { expect } from "playwright/test";

export class CartTableComponent {
    private readonly root: Locator;
    private readonly rows: Locator;
    private readonly price: Locator;
    private readonly quantity: Locator;
    private readonly rowTotalPrice: Locator;
    constructor(page: Page) {
        this.root = page.locator("#cart_info_table");
        this.rows = this.root.locator("tbody tr");
        this.price = page.locator(".cart_price");
        this.quantity = page.locator(".cart_quantity");
        this.rowTotalPrice = page.locator(".cart_total_price");

    }
    getRow(name: string) {
        return this.rows.filter(
            {
                has: this.rows.page().getByRole("link", { name: name, exact: true })
            }
        );
    }
    async getRowData(name: string) {
        const price = getPriceWithoutCurrency(await this.getRow(name).locator(this.price).textContent() as string);
        const quantity = parseFloat(await this.getRow(name).locator(this.quantity).textContent() as string);
        const totalPrice = getPriceWithoutCurrency(await this.getRow(name).locator(this.rowTotalPrice).textContent() as string);
        const rowData = { price, quantity, totalPrice };
        return rowData;
    }
    async expectProduct(data: { name: string, price: number, quantity: number }) {
        const productRow = this.getRow(data.name);
        await expect(productRow).toBeVisible();
        const actual: { price: number, quantity: number, totalPrice: number } = await this.getRowData(data.name);
        expect(actual.price).toBe(data.price);
        expect(actual.quantity).toBe(data.quantity);
        expect(actual.totalPrice).toBe(data.price * data.quantity);
    }

}