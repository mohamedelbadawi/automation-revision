import { Locator, expect } from "@playwright/test";
import { User } from "../../../data/users";

// Used for both delivery and billing address, so the page passes the root
export class AddressComponent {
    constructor(private readonly root: Locator) { }

    async expectAddress(user: User) {
        await expect(this.root.locator('.address_firstname'))
            .toHaveText(`${user.title}. ${user.firstName} ${user.lastName}`);
        await expect(this.root.locator('.address_address1'))
            .toHaveText([user.company, user.address, user.address2]);
        await expect(this.root.locator('.address_city'))
            .toHaveText(`${user.city} ${user.state} ${user.zipCode}`);
        await expect(this.root.locator('.address_country_name')).toHaveText(user.country);
        await expect(this.root.locator('.address_phone')).toHaveText(user.mobileNumber);
    }
}
