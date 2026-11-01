import { Locator } from "playwright";

export class LoginFormComponent {
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    constructor(root: Locator) {
        this.email = root.getByTestId('login-email');
        this.password = root.getByTestId('login-password');
        this.loginButton = root.getByTestId('login-button');
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

}