import { Locator, expect } from "@playwright/test";
import { getPriceWithoutCurrency } from "../../../helpers/helper";

// Same table on the cart and checkout pages, so the page passes the root
export class CartTableComponent {
    private readonly rows: Locator;


    constructor(root: Locator) {
        this.rows = root.locator('tbody tr');
    }

    private getRow(name: string) {
        return this.rows.filter({
            has: this.rows.page().getByRole('link', { name, exact: true })
        });
    }

    private async getRowData(name: string) {
        const row = this.getRow(name);
        const price = getPriceWithoutCurrency(await row.locator('.cart_price').textContent() as string);
        const quantity = parseFloat(await row.locator('.cart_quantity').textContent() as string);
        const totalPrice = getPriceWithoutCurrency(await row.locator('.cart_total_price').textContent() as string);
        return { price, quantity, totalPrice };
    }
    async removeProduct(name: string) {
        const row = this.getRow(name);
        await row.locator('a.cart_quantity_delete').click();
    }

    async expectProduct(expected: { name: string, price: number, quantity: number }) {
        await expect(this.getRow(expected.name)).toBeVisible();
        const actual = await this.getRowData(expected.name);
        expect(actual.price, `${expected.name}: price`).toBe(expected.price);
        expect(actual.quantity, `${expected.name}: quantity`).toBe(expected.quantity);
        expect(actual.totalPrice, `${expected.name}: total = price x quantity`).toBe(expected.price * expected.quantity);
    }
    async expectProductNotExist(productName: string) {
        await expect(this.getRow(productName)).toBeHidden();
    }

}
