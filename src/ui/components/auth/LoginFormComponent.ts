import { Locator } from "playwright";
import { expect } from "playwright/test";

export class LoginFormComponent {
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly errorLoginMessage: Locator;
    constructor(root: Locator) {
        this.email = root.getByTestId('login-email');
        this.password = root.getByTestId('login-password');
        this.loginButton = root.getByTestId('login-button');
        this.errorLoginMessage = root.getByText('Your email or password is incorrect!');
    }
    async fillData(data: {
        email: string,
        password: string
    }) {
        await this.email.fill(data.email);
        await this.password.fill(data.password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(data: {
        email: string,
        password: string
    }) {
        await this.fillData(data);
        await this.clickLoginButton();
    }
    async expectErrorMessage() {
        await expect(this.errorLoginMessage).toHaveText('Your email or password is incorrect!');
    }

}