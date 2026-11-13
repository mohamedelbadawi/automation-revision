import { APIRequestContext } from "playwright";
import { expect } from "playwright/test";

export async function send(request: APIRequestContext, method: string, path: string, form?: Record<string, string | number>) {
    const response = await request.fetch(path, { method, form });
    return await response.json();
}
export function expectStatusCode(body: { responseCode: number, message?: string }, code: number, message?: string) {
    expect(body.responseCode, `responseCode (message: ${body.message})`).toBe(code);
    if (message) expect(body.message).toBe(message)
}

