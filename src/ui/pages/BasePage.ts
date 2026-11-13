import { Page } from "playwright";
import { HeaderComponent } from "../components/shared/HeaderComponent";
import { SubscriptionFooterComponent } from "../components/shared/SubscriptionFooterComponent";

export class BasePage {
    readonly header: HeaderComponent;
    readonly subscriptionFooter: SubscriptionFooterComponent;
    constructor(protected readonly page: Page) {
        this.header = new HeaderComponent(page);
        this.subscriptionFooter = new SubscriptionFooterComponent(page);
    }

    // scroll down to bottom of the page
    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }



}