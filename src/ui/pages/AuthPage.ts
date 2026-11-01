import { Page } from "playwright";
import { LoginFormComponent } from "../components/auth/LoginFormComponent";
import { SignupFormComponent } from "../components/auth/SignupFormComponent";

export class AuthPage {
    private readonly sigupFormComponent: SignupFormComponent;
    private readonly loginFormComponent: LoginFormComponent;
    constructor(private readonly page: Page) {
        this.sigupFormComponent = new SignupFormComponent(page.locator('.signup-form'));
        this.loginFormComponent = new LoginFormComponent(page.locator('.login-form'))
    }
    getSigupFormComponent() {
        return this.sigupFormComponent;
    }
    getLoginFormComponent() {
        return this.loginFormComponent;
    }


}