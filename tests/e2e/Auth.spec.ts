
import { getUserData } from '../../src/data/users';
import { expect, test } from "../../src/fixtures/index";
import { getUniqueEmail } from '../../src/helpers/helper';

test('Test Case 1: Register User', async ({ page, signupPage, homePage, authPage }) => {
    // get User
    await homePage.open();
    const user = getUserData();

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
test("TC2: login", async ({ user, signupPage, homePage, authPage }) => {
    // need to login first with API 
    await homePage.open();
    await homePage.header.navigateTo('login');
    await authPage.getLoginFormComponent().login({ email: user.email, password: user.password });
    await authPage.header.expectLoggedInAs(user.name);
    await authPage.header.clickDeleteAccount();
    await signupPage.expectAccountDeleted();
    await signupPage.clickContinueButton();
})
test("TC3: login with wrong credentials", async ({ homePage, authPage }) => {

    await homePage.open();
    await homePage.header.navigateTo('login');
    await authPage.getLoginFormComponent().login({ email: getUniqueEmail(), password: '2194u812' });
    await authPage.getLoginFormComponent().expectErrorMessage();
    await authPage.header.expectNotLoggedIn();
})

test('TC4: logout', async ({ user, homePage, authPage }) => {
    await homePage.open();
    await homePage.header.navigateTo('login');
    await authPage.getLoginFormComponent().login({ email: user.email, password: user.password });
    await homePage.header.expectLoggedInAs(user.name);
    await homePage.header.clickLogout();
    await authPage.header.expectNotLoggedIn();

})

test('TC5: Register with an existing email', async ({ page, user, homePage, authPage }) => {
    await homePage.open();
    await homePage.header.navigateTo('login');
    await authPage.getSigupFormComponent().signup({ name: user.name, email: user.email });
    await authPage.getSigupFormComponent().expectErrorMessage();

})
