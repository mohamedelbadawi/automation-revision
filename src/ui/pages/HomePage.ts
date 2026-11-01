import { Locator, Page, expect } from "@playwright/test";
import { HeaderComponent } from "../components/shared/HeaderComponent";

export class HomePage {
    private readonly headerComponent: HeaderComponent

    constructor(private readonly page: Page) {
        this.headerComponent = new HeaderComponent(page)

    }
    getHeaderComponent() {
        return this.headerComponent;
    }
    

}