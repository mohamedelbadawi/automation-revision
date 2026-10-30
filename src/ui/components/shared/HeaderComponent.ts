import { Locator, Page } from '@playwright/test';

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
    constructor(private page: Page) {
        this.root = this.page.locator('#header');
    }

    async navigateTo(item: navItems) {
        await this.root.getByRole('link', { name: NAV_ITEMS[item] }).click();
    }

}


