
import { test as base } from "@playwright/test"
import { AuthPage } from "../ui/pages/AuthPage"
import { SignupPage } from "../ui/pages/SignupPage";
import { HomePage } from "../ui/pages/HomePage";
type Pages = {
    authPage: AuthPage;
    signupPage: SignupPage;
    homePage: HomePage;
}
export const pageTest = base.extend<Pages>({
    authPage: async ({ page }, use) => {
        const authPage = new AuthPage(page);
        await use(authPage);
    },
    signupPage: async ({ page }, use) => {
        const signupPage = new SignupPage(page);
        await use(signupPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }
})

export { expect } from "@playwright/test"