import { APIRequestContext, expect } from "@playwright/test";
import { User } from "../../data/users";

export async function createUser(request: APIRequestContext, user: User) {
    const response = await request.post('/api/createAccount', {
        form: {
            name: user.name,
            email: user.email,
            password: user.password,
            title: user.title,
            birth_date: user.dateOfBirth.day,
            birth_month: user.dateOfBirth.month,
            birth_year: user.dateOfBirth.year,
            firstname: user.firstName,
            lastname: user.lastName,
            company: user.company,
            address1: user.address,
            address2: user.address2,
            country: user.country,
            zipcode: user.zipCode,
            state: user.state,
            city: user.city,
            mobile_number: user.mobileNumber,
        },
    });
    const jsonResponse: { responseCode: number, message: string } = await response.json();
    expect(jsonResponse.responseCode, `createUser failed: ${jsonResponse.message}`).toBe(201);
    return jsonResponse;
}

export async function deleteUser(request: APIRequestContext, user: User) {
    const response = await request.delete('/api/deleteAccount', {
        form: {
            email: user.email,
            password: user.password
        }
    });
    const jsonResponse: { responseCode: number, message: string } = await response.json();
    // 200: deleted now, 404: already deleted by the test itself. Both are fine for cleanup
    expect([200, 404]).toContain(jsonResponse.responseCode);
    return jsonResponse;
}
