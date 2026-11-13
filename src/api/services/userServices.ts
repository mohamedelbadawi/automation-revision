import { APIRequestContext, expect } from '@playwright/test';
import { User } from '../../data/users';
import { expectStatusCode, send } from '../client/APIClient';

export function toForm(user: User) {
    return {
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
    };
}


export async function createAccount(request: APIRequestContext, user: User) {
    return send(request, 'POST', '/api/createAccount', toForm(user));
}

export async function deleteAccount(request: APIRequestContext, user: User) {
    return send(request, 'DELETE', '/api/deleteAccount', { email: user.email, password: user.password });
}


export async function createUser(request: APIRequestContext, user: User) {
    const body = await createAccount(request, user);
    expectStatusCode(body, 201);
}

export async function deleteUser(request: APIRequestContext, user: User) {
    const body = await deleteAccount(request, user);
    expect([200, 404]).toContain(body.responseCode);
}


