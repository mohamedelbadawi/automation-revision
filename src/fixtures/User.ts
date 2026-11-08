import { test as base } from "@playwright/test";
import { getUserData, User } from '../data/users';
import { createUser, deleteUser } from "../api/services/userServices";

type UserFixtures = {
    // an existing user, created through the API before the test
    user: User;
    // user data only, for tests that register through the UI
    newUser: User;
};

const userTest = base.extend<UserFixtures>({
    user: async ({ request }, use) => {
        const user = getUserData();
        await createUser(request, user);
        await use(user);
        await deleteUser(request, user);
    },
    newUser: async ({ request }, use) => {
        const user = getUserData();
        await use(user);
        await deleteUser(request, user);
    },
});

export { userTest };
