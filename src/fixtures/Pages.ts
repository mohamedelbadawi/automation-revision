
import { test as base } from "@playwright/test"
import { AuthPage } from "../ui/pages/AuthPage"
import { SignupPage } from "../ui/pages/SignupPage";
import { HomePage } from "../ui/pages/HomePage";
import { ContactUsPage } from "../ui/pages/ContactUsPage";
type Pages = {
    authPage: AuthPage;
    signupPage: SignupPage;
    homePage: HomePage;
    contactUsPage: ContactUsPage
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
    },
    contactUsPage: async ({ page }, use) => {
        const contactUsPage = new ContactUsPage(page);
        await use(contactUsPage);
    }

})

export { expect } from "@playwright/test"