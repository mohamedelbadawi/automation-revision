import { mergeTests } from "playwright/test";
import { pageTest } from "./Pages";
import { adsTest } from "./ads";
import { userTest } from "./User";
import { expect } from "@playwright/test";

const test = mergeTests(pageTest, adsTest, userTest)

export { test, expect }