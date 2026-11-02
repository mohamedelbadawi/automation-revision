import { Locator } from "playwright";
import { expect } from "playwright/test";

export class SignupFormComponent {
    private readonly name: Locator;
    private readonly email: Locator;
    private readonly submitButton: Locator;
    private readonly errorMessage: Locator;
    constructor(root: Locator) {
        this.name = root.getByTestId('signup-name');
        this.email = root.getByTestId('signup-email');
        this.submitButton = root.getByTestId('signup-button');
        this.errorMessage = root.getByText('Email Address already exist!');
    }

    async fillForm(data: {
        name: string;
        email: string;
    }) {
        await this.name.pressSequentially(data.name);
        await this.email.pressSequentially(data.email);
    }

    async submit() {
        await this.submitButton.click();
    }

    async signup(data: {
        name: string;
        email: string;
    }) {
        await this.fillForm(data);
        await this.submit();

    }
    async expectErrorMessage() {
        await expect(this.errorMessage).toHaveText('Email Address already exist!');
    }
}