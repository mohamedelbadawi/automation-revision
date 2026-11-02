import { test as base } from "@playwright/test";
import { getUserData, User } from '../data/users'
import { createUser, deleteUser } from "../api/services/userServices";
import { APIRequestContext } from "playwright";
type userFixture = {
    user: User;
}
const userTest = base.extend<userFixture>({
    user: async ({ request }, use) => {
        const user = getUserData();
        await createUser(request, user)
        await use(user);
        await deleteUser(request, user)

    }
})
export { userTest }