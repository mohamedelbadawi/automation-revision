import { expect, test } from "@fixtures/api";
import { expectStatusCode, send } from "../../src/api/client/APIClient";
import { brandListResponseSchema } from "../../src/api/schemas/Brand.schema";


test("TC3:Get All Brands List", async ({ request }) => {
    const jsonResponse = await send(request, "GET", "/api/brandsList");
    expectStatusCode(jsonResponse, 200)
    brandListResponseSchema.parse(jsonResponse);
    expect(jsonResponse.brands.length).toBeGreaterThan(0)
})


test("TC4:PUT To All Brands List", async ({ request }) => {
    const jsonResponse = await send(request, "PUT", "/api/brandsList");
    expectStatusCode(jsonResponse, 405)
    expect(jsonResponse.message).toBe("This request method is not supported.")

})