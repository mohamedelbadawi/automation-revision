import { APIRequestContext } from "playwright";
import { User } from "../../data/users";
import { expect } from "playwright/test";

export async function createUser(request: APIRequestContext, user: User) {


    const response = await request.post('/api/createAccount', {
        form: {
            name: user.name,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            password: user.password,
            address: user.address,
            country: user.country,
            state: user.state,
            city: user.city,
            zipcode: user.zipCode,
            mobile_number: user.mobileNumber,
            address2: user.address2,
            address1: user.address,
        },
    });
    const jsonResponse: { responseCode: number, message: string } = await response.json()
    expect(jsonResponse.responseCode).toBe(201);
    expect(jsonResponse.message).toBe('User created!');
    return jsonResponse;
}