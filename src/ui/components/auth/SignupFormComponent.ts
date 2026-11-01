import { Locator } from "playwright";

export class SignupFormComponent {
    private readonly name: Locator;
    private readonly email: Locator;
    private readonly submitButton: Locator;
    constructor(root: Locator) {
        this.name = root.getByTestId('signup-name');
        this.email = root.getByTestId('signup-email');
        this.submitButton = root.getByTestId('signup-button');
    }

    async fillForm(data: {
        name: string;
        email: string;
    }) {
        await this.name.pressSequentially(data.name);
        await this.email.pressSequentially(data.email);
    }

    async submit() {
        await this.submitButton.click();
    }

    async signup(data: {
        name: string;
        email: string;
    }) {
        await this.fillForm(data);
        await this.submit();

    }
}