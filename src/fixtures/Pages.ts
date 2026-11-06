
import { test as base } from "@playwright/test"
import { AuthPage } from "../ui/pages/AuthPage"
import { SignupPage } from "../ui/pages/SignupPage";
import { HomePage } from "../ui/pages/HomePage";
import { ContactUsPage } from "../ui/pages/ContactUsPage";
import { ProductsPage } from "../ui/pages/ProductsPage";
import { ProductDetailsPage } from "../ui/pages/ProductDetailsPage";
type Pages = {
    authPage: AuthPage;
    signupPage: SignupPage;
    homePage: HomePage;
    contactUsPage: ContactUsPage
    productsPage: ProductsPage,
    productDetailsPage: ProductDetailsPage
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
    },
    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },
    productDetailsPage: async ({ page }, use) => {
        const productDetailsPage = new ProductDetailsPage(page);
        await use(productDetailsPage);
    }

})

export { expect } from "@playwright/test"