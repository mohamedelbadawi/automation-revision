import { Locator, Page } from "playwright";
import { ProductCardComponent } from "../components/product/ProductCardComponent";
import { HeaderComponent } from "../components/shared/HeaderComponent";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";
import { AddedToCartModalComponent } from "../components/shared/AddedToCartModalComponent";
import { ProductSidebarComponent } from "../components/shared/ProductSidebarComponent";

export class ProductsPage extends BasePage {
    private readonly productsHeader: Locator;
    private readonly productSection: Locator;
    private readonly cards: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    readonly addedToCartModal: AddedToCartModalComponent;
    readonly productSidebarComponent: ProductSidebarComponent;
    constructor(page: Page) {
        super(page);
        this.productSection = this.page.locator('.features_items');
        this.productsHeader = this.productSection.locator("h2.title");
        this.cards = this.page.locator('.product-image-wrapper');
        this.searchInput = this.page.locator('#search_product');
        this.searchButton = this.page.locator('#submit_search');
        this.addedToCartModal = new AddedToCartModalComponent(page);
        this.productSidebarComponent=new ProductSidebarComponent(page);

    }

    async expectLoaded() {
        await expect(this.productsHeader).toHaveText("All Products");
    }
    nthProductCard(index: number) {
        return new ProductCardComponent(this.cards.nth(index - 1));
    }
    async search(productName: string) {
        await this.searchInput.pressSequentially(productName, { delay: 100 });
        await this.searchButton.click();
    }
    async expectSearchedProductsHeading() {
        await expect(this.productsHeader).toHaveText(`Searched Products`);
    }
    async expectHeadingContain(category: string) {
        await expect(this.productsHeader).toContainText(category);
    }

    async getAllProducts() {
        // get all product cards in the page  
        return this.cards.all();
    }
    async expectProductsListNotEmpty() {
        expect((await this.cards.all()).length).toBeGreaterThanOrEqual(1)
    }
    async expectAllProductsNameContain(productName: string) {
        const allProducts = await this.getAllProducts();

        for (let i = 0; i < allProducts.length; i++) {
            const productCard = new ProductCardComponent(this.cards.nth(i));
            const actualProductName = await productCard.getProductName();
            expect(actualProductName?.toLowerCase()).toContain(productName.toLowerCase());
        }
    }

}