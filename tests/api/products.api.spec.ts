import { expect, test } from "@fixtures/api";
import { expectStatusCode, send } from "../../src/api/client/APIClient";
import { ProductsListResponseSchema } from "../../src/api/schemas/product.schema";
import { brandListResponseSchema } from "../../src/api/schemas/Brand.schema";
import { toLowerCase } from "zod";

test("TC1:Get All Products List", async ({ request }) => {
    const jsonResponse = await send(request, "GET", "/api/productsList");
    expectStatusCode(jsonResponse, 200)
    ProductsListResponseSchema.parse(jsonResponse)
    expect(jsonResponse.products.length).toBeGreaterThan(0)
})

test("TC2:POST To All Products List", async ({ request }) => {
    const jsonResponse = await send(request, "POST", "/api/productsList");
    expectStatusCode(jsonResponse, 405)
    expect(jsonResponse.message).toBe("This request method is not supported.");
})

test("TC5 : POST To Search Product", async ({ request }) => {
    const jsonResponse = await send(request, "POST", "/api/searchProduct", { search_product: "top" })
    expectStatusCode(jsonResponse, 200)
    expect(jsonResponse.products.length).toBeGreaterThan(0)
    for (const product of jsonResponse.products) {
        const nameMatches = product.name.toLowerCase().includes("top");
        const categoryMatches = product.category.category.toLowerCase().includes("top");
        expect(nameMatches || categoryMatches).toBe(true);
    }
})

test("TC6: POST To Search Product without search_product parameter", async ({ request }) => {
    const jsonResponse = await send(request, "POST", "api/searchProduct");
    expectStatusCode(jsonResponse, 400)
    expect(jsonResponse.message).toBe("Bad request, search_product parameter is missing in POST request.")
})