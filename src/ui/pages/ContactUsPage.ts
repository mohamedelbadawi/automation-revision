import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage"
import { contactUsDTO } from "../../data/types/contactUs";

export class ContactUsPage extends BasePage {
    private readonly nameInput;
    private readonly emailInput;
    private readonly subjectInput;
    private readonly messageInput;
    private readonly fileUpload;
    private readonly submitButton;
    private readonly successMessage;
    constructor(readonly page: Page) {
        super(page)
        this.nameInput = page.getByTestId('name');
        this.subjectInput = page.getByTestId('subject');
        this.messageInput = page.getByTestId('message');
        this.emailInput = page.getByTestId('email');
        this.submitButton = page.getByTestId('submit-button');
        this.fileUpload = page.getByRole('button', { name: 'Choose File' });
        this.successMessage = page.locator('div.status.alert.alert-success')
    }

    async fillName(name: string): Promise<void> {
        await this.nameInput.pressSequentially(name, { delay: 100 });
    }
    async fillEmail(email: string): Promise<void> {
        await this.emailInput.pressSequentially(email, { delay: 100 });
    }
    async fillSubject(subject: string): Promise<void> {
        await this.subjectInput.pressSequentially(subject, { delay: 100 });
    }
    async fillMessage(message: string): Promise<void> {
        await this.messageInput.pressSequentially(message, { delay: 100 });
    }
    async uploadFile(filePath: string): Promise<void> {
        await this.fileUpload.setInputFiles(filePath);
    }

    async submit() {
        this.page.once('dialog', dialog => dialog.accept());
        await this.submitButton.click();
    }

    async fillContactForm(contactUsData: contactUsDTO): Promise<void> {
        await this.fillName(contactUsData.name);
        await this.fillEmail(contactUsData.email);
        await this.fillSubject(contactUsData.subject);
        await this.fillMessage(contactUsData.message);
        if (contactUsData.filePath) {

            await this.uploadFile(contactUsData.filePath);
        }
    }
    async expectSuccessMessage() {
        await expect(this.successMessage).toHaveText('Success! Your details have been submitted successfully.');
    }

}