import { Locator, Page } from "playwright";

export class ProductSidebarComponent {
    private readonly root: Locator;
    private readonly brands: Locator;
    constructor(page: Page) {
        this.root = page.locator('.left-sidebar');
        this.brands = page.locator(".brands-name");
    }
    async selectCategory(mainCategory: string, subCategory: string) {
        const categoryLocator = this.root.locator(`a[href="#${mainCategory}"]`);
        await categoryLocator.click();
        await this.root.getByRole("link", { name: subCategory, exact: true }).click();

    }
    async selectBrand(brand: string) {
        await this.brands.getByRole('link', { name: brand }).click();
    }

}