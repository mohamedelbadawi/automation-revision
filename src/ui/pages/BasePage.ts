import { Page } from "playwright";
import { HeaderComponent } from "../components/shared/HeaderComponent";

export class BasePage {
    readonly header: HeaderComponent;
    constructor(protected readonly page: Page) {
        this.header = new HeaderComponent(page)
    }

}