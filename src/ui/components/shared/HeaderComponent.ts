import { Locator, Page, expect } from '@playwright/test';

const NAV_ITEMS = {
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    login: 'Signup / Login',
    contact: 'Contact us',
};
type navItems = keyof typeof NAV_ITEMS;
export class HeaderComponent {
    readonly root: Locator;
    readonly isLoggedinLabel: Locator;
    readonly deleteAccountLink: Locator;
    constructor(private page: Page) {
        this.root = this.page.locator('#header');
        this.isLoggedinLabel = this.root.getByText('Logged in as')
        this.deleteAccountLink = this.root.getByRole('link', { name: ' Delete Account' });

    }

    async navigateTo(item: navItems) {
        await this.root.getByRole('link', { name: NAV_ITEMS[item] }).click();
    }
    async clickDeleteAccount() {
        await this.deleteAccountLink.click();
    }

    async expectLoggedInAs(name: string) {
        await expect(this.isLoggedinLabel).toHaveText(`Logged in as ${name}`)
    }
}


