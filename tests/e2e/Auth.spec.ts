import { expect } from '@playwright/test';
import { SignupPage } from '../../src/ui/pages/SignupPage';
import { AuthPage } from '../../src/ui/pages/AuthPage';
import { getUserData } from '../../src/data/users';
import { HomePage } from '../../src/ui/pages/HomePage';
import { test } from "../../src/fixtures/ads";

test('Test Case 1: Register User', async ({ page }) => {
    // get User
    await page.goto('');
    const user = getUserData();
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const authPage = new AuthPage(page);
    // Navigate to Login page
    await homePage.getHeaderComponent().navigateTo('login');
    await authPage.getSigupFormComponent().signup({ name: user.name, email: user.email });
    await signupPage.fillAccountInfo(user);
    await signupPage.clickCreateAccount();
    await signupPage.expectAccountCreated();
    await signupPage.clickContinueButton();
    await homePage.getHeaderComponent().expectLoggedInAs(user.name)
    // delete the user
    await homePage.getHeaderComponent().clickDeleteAccount();
    await signupPage.expectAccountDeleted();
    await signupPage.clickContinueButton();
});

