import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Card } from "../../data/cards";

export class PaymentPage extends BasePage {
    private readonly nameOnCardInput: Locator;
    private readonly cardNumberInput: Locator;
    private readonly cvcInput: Locator;
    private readonly expiryMonthInput: Locator;
    private readonly expiryYearInput: Locator;
    private readonly payButton: Locator;
    constructor(page: Page) {
        super(page);
        this.nameOnCardInput = page.getByTestId('name-on-card');
        this.cardNumberInput = page.getByTestId('card-number');
        this.cvcInput = page.getByTestId('cvc');
        this.expiryMonthInput = page.getByTestId('expiry-month');
        this.expiryYearInput = page.getByTestId('expiry-year');
        this.payButton = page.getByTestId('pay-button');
    }

    async pay(card: Card) {
        await this.nameOnCardInput.fill(card.nameOnCard);
        await this.cardNumberInput.fill(card.number);
        await this.cvcInput.fill(card.cvc);
        await this.expiryMonthInput.fill(card.expiryMonth);
        await this.expiryYearInput.fill(card.expiryYear);
        await this.payButton.click();
    }
}