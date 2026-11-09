import { Locator, Page } from "playwright";
import { ProductCardComponent } from "../product/ProductCardComponent";

export class RecommendedItemsComponent {
    readonly root: Locator;
    constructor(page: Page) {
        this.root = page.locator("#recommended-item-carousel .product-image-wrapper");
    }
    nthProductCard(index: number) {
        return new ProductCardComponent(this.root.filter({ visible: true }).nth(index - 1));
    }

}