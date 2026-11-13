import { test as base } from "@playwright/test";
import { getUserData, User } from '../data/users';
import { createUser, deleteUser } from "../api/services/userServices";

type UserFixtures = {
    user: User;
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

    },
});

export { userTest };

