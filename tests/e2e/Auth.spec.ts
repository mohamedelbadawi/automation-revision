import { SignupPage } from '../../src/ui/pages/SignupPage';
import { AuthPage } from '../../src/ui/pages/AuthPage';
import { getUserData } from '../../src/data/users';
import { HomePage } from '../../src/ui/pages/HomePage';
import { expect, test } from "../../src/fixtures/ads";
import { createUser } from '../../src/api/services/userServices';
import { getUniqueEmail } from '../../src/helpers/helper';

test('Test Case 1: Register User', async ({ page }) => {
    // get User
    await page.goto('');
    const user = getUserData();
    console.log(user.email, user.password);
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);
    const authPage = new AuthPage(page);
    // Navigate to Login page
    await homePage.header.navigateTo('login');
    await authPage.getSigupFormComponent().signup({ name: user.name, email: user.email });
    await signupPage.fillAccountInfo(user);
    await signupPage.clickCreateAccount();
    await signupPage.expectAccountCreated();
    await signupPage.clickContinueButton();
    await homePage.header.expectLoggedInAs(user.name)
    // delete the user
    await homePage.header.clickDeleteAccount();
    await signupPage.expectAccountDeleted();
    await signupPage.clickContinueButton();
});
test("TC2: login", async ({ page, request }) => {
    // need to login first with API 
    const user = getUserData();
    const authPage = new AuthPage(page);
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);
    await createUser(request, user);
    await homePage.open();
    await homePage.header.navigateTo('login');
    await authPage.getLoginFormComponent().login({ email: user.email, password: user.password });
    await authPage.header.expectLoggedInAs(user.name);
    await authPage.header.clickDeleteAccount();
    await signupPage.expectAccountDeleted();
    await signupPage.clickContinueButton();
})
test("TC3: login with wrong credentials", async ({ page }) => {
    const authPage = new AuthPage(page);
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.header.navigateTo('login');
    await authPage.getLoginFormComponent().login({ email: getUniqueEmail(), password: '2194u812' });
    await authPage.getLoginFormComponent().expectErrorMessage();
    await authPage.header.expectNotLoggedIn();
})

test('TC4: logout', async ({ page, request }) => {
    const user = getUserData();
    const authPage = new AuthPage(page);
    const signupPage = new SignupPage(page);
    const homePage = new HomePage(page);
    await createUser(request, user);
    await homePage.open();
    await homePage.header.navigateTo('login');
    await authPage.getLoginFormComponent().login({ email: user.email, password: user.password });
    await homePage.header.expectLoggedInAs(user.name);
    await homePage.header.clickLogout();
    await authPage.header.expectNotLoggedIn();

})

