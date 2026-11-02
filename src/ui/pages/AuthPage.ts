import { Page } from "playwright";
import { LoginFormComponent } from "../components/auth/LoginFormComponent";
import { SignupFormComponent } from "../components/auth/SignupFormComponent";
import { HeaderComponent } from "../components/shared/HeaderComponent";
import { BasePage } from "./BasePage";

export class AuthPage extends BasePage {
    private readonly sigupFormComponent: SignupFormComponent;
    private readonly loginFormComponent: LoginFormComponent;
    constructor(page: Page) {
        super(page);
        this.sigupFormComponent = new SignupFormComponent(page.locator('.signup-form'));
        this.loginFormComponent = new LoginFormComponent(page.locator('.login-form'));
    }
    getSigupFormComponent() {
        return this.sigupFormComponent;
    }
    getLoginFormComponent() {
        return this.loginFormComponent;
    }

    async open() {
        await this.page.goto('/login');
    }

    

}