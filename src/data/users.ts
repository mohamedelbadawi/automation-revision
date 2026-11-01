import { getUniqueEmail } from "../helpers/helper";


export type User = {
    title: "Mr." | "Mrs.";
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: {
        day: number;
        month: number;
        year: number;
    };
    gender: "male" | "female";
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    mobileNumber: string;
    address2: string;
    company: string;
}


export function getUserData(): User {
    return {
        title: "Mr.",
        name: "Mohamed",
        firstName: "Mohamed",
        lastName: "Ahmed",
        email: getUniqueEmail(),
        password: "testPassword",
        dateOfBirth: {
            day: 1,
            month: 1,
            year: 2000
        },
        gender: "male",
        address: "123 Main St",
        city: "Cairo",
        state: "Cairo",
        zipCode: "12345",
        country: "United States",
        mobileNumber: "1234567890",
        company: "testCompany",
        address2: "testAddress2",


    }
}

