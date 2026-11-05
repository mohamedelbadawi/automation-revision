import { contactUsDTO } from "../../src/data/types/contactUs";
import { test } from "../../src/fixtures/index";
test("TC6: Contact us form", async ({ page, homePage, contactUsPage }) => {
    await homePage.open();
    await homePage.header.navigateTo('contact');
    await contactUsPage.fillContactForm({
        name: 'test',
        email: 'test@test.com',
        subject: 'test',
        message: 'test',
        filePath: 'src/data/test.txt',
    });
    await contactUsPage.submit();
    await contactUsPage.expectSuccessMessage();

    await contactUsPage.header.navigateTo('home');
    await homePage.expectLoaded();

})  