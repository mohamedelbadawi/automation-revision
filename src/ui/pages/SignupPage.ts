import { Page, Locator, expect } from "@playwright/test";
import { User } from "../../data/users";
import { BasePage } from "./BasePage";

export class SignupPage extends BasePage {
    private readonly password: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly company: Locator;
    private readonly address: Locator;
    private readonly address2: Locator;
    private readonly state: Locator;
    private readonly city: Locator;
    private readonly zipCode: Locator;
    private readonly country: Locator;
    private readonly mobileNumber: Locator;
    private readonly createAccount: Locator;
    private readonly birthDays: Locator;
    private readonly birthMonth: Locator;
    private readonly birthYear: Locator;
    private readonly accountCreatedMessage: Locator;
    private readonly continueButton: Locator;
    private readonly deletedAccountMessage: Locator;
    private readonly newsLetterCheckbox: Locator;
    private readonly offersCheckbox: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.firstName = page.getByTestId('first_name');
        this.lastName = page.getByTestId('last_name');
        this.password = page.getByTestId('password');
        this.company = page.getByTestId('company');
        this.address = page.getByTestId('address');
        this.address2 = page.getByTestId('address2');
        this.state = page.getByTestId('state');
        this.city = page.getByTestId('city');
        this.zipCode = page.getByTestId('zipcode');
        this.country = page.getByTestId('country');
        this.mobileNumber = page.getByTestId('mobile_number');
        this.createAccount = page.getByTestId('create-account');
        this.password = page.getByTestId('password');
        this.birthDays = page.getByTestId('days');
        this.birthMonth = page.getByTestId('months');
        this.birthYear = page.getByTestId('years');
        this.accountCreatedMessage = page.getByTestId('account-created');
        this.continueButton = page.getByTestId('continue-button');
        this.deletedAccountMessage = page.getByTestId('account-deleted');
        this.newsLetterCheckbox = page.locator('#newsletter');
        this.offersCheckbox = page.locator('#optin');

    }
    async fillAccountInfo(user: User) {
        await this.page.getByLabel(`${user.title}.`).check();
        await this.firstName.pressSequentially(user.firstName);
        await this.lastName.pressSequentially(user.lastName);
        await this.password.pressSequentially(user.password);
        await this.birthDays.selectOption({ value: `${user.dateOfBirth.day}` });
        await this.birthMonth.selectOption({ value: `${user.dateOfBirth.month}` });
        await this.birthYear.selectOption({ value: `${user.dateOfBirth.year}` });
        await this.newsLetterCheckbox.check();
        await this.offersCheckbox.check();
        await this.company.pressSequentially(user.company);
        await this.address.pressSequentially(user.address);
        await this.address2.pressSequentially(user.address2);
        await this.state.pressSequentially(user.state);
        await this.city.pressSequentially(user.city);
        await this.zipCode.pressSequentially(user.zipCode);
        await this.country.selectOption({ value: user.country });
        await this.mobileNumber.pressSequentially(user.mobileNumber);
    }

    async clickCreateAccount() {
        await this.createAccount.click();
    }
    async clickContinueButton() {
        await this.continueButton.click();
    }

    async expectAccountCreated() {
        await expect(this.accountCreatedMessage).toHaveText('Account Created!');
    }
    async expectAccountDeleted() {
        await expect(this.deletedAccountMessage).toHaveText('Account Deleted!');
    }
}