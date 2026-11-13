import { expect, test } from "@fixtures/api";
import { expectStatusCode, send } from "../../src/api/client/APIClient";
import { toForm } from "../../src/api/services/userServices";

test("TC7: POST To Verify Login with valid details", async ({ request, user }) => {
    const jsonResponse = await send(request, "POST", "api/verifyLogin", { email: user.email, password: user.password })

    expectStatusCode(jsonResponse, 200);
    expect(jsonResponse.message).toBe("User exists!");
})

test("TC8: POST To Verify Login with invalid email", async ({ request, user }) => {
    const jsonResponse = await send(request, "POST", "api/verifyLogin", { email: user.email })
    expectStatusCode(jsonResponse, 400);
    expect(jsonResponse.message).toBe("Bad request, email or password parameter is missing in POST request.");
})
test("TC 9: DELETE To Verify Login", async ({ request, user }) => {
    const jsonResponse = await send(request, "DELETE", "api/verifyLogin")
    expectStatusCode(jsonResponse, 405);
    expect(jsonResponse.message).toBe("This request method is not supported.");
})

test("TC10: POST To Verify Login with invalid details", async ({ request }) => {
    const jsonResponse = await send(request, "POST", "api/verifyLogin", { email: "InvalidEmail", password: "invalidpassword" })
    expectStatusCode(jsonResponse, 404);
    expect(jsonResponse.message).toBe("User not found!");
})

test("TC11: POST To Create/Register User Account", async ({ request, newUser }) => {
    const jsonResponse = await send(request, "POST", "api/createAccount", toForm(newUser))
    expectStatusCode(jsonResponse, 201);
    expect(jsonResponse.message).toBe("User created!");
})
test("TC12: DELETE METHOD To Delete User Account", async ({ request, user }) => {
    const jsonResponse = await send(request, "DELETE", "api/deleteAccount", { email: user.email, password: user.password })
    expectStatusCode(jsonResponse, 200);
    expect(jsonResponse.message).toBe("Account deleted!");
})

test("TC13: PUT METHOD To Update User Account", async ({ request, user }) => {
    const jsonResponse = await send(request, "PUT", "api/updateAccount", toForm(user))
    expectStatusCode(jsonResponse, 200);
    expect(jsonResponse.message).toBe("User updated!");
})

test("TC14: GET user account detail by email", async ({ request, user }) => {
    const jsonResponse = await send(request, "GET", "api/getUserDetailByEmail?email=" + user.email)
    expectStatusCode(jsonResponse, 200);
    expect(jsonResponse.user.email).toBe(user.email);
})