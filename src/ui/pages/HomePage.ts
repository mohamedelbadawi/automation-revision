import { Locator, Page, expect } from "@playwright/test";
import { HeaderComponent } from "../components/shared/HeaderComponent";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async open() {
        await this.page.goto('/');
    }
    async expectLoaded() {
        await expect(this.page).toHaveURL('');
    }

}