import { test as base } from '@playwright/test';

const AD_HOSTS = /googlesyndication|doubleclick|googleadservices|adservice\.google|googletagmanager|fundingchoicesmessages/;

export const adsTest = base.extend<{ blockAds: void }>({
    blockAds: [async ({ context }, use) => {
        await context.route(AD_HOSTS, route => {
            return route.abort();
        })
        await use();
    }, { auto: true }]
});

export { expect } from '@playwright/test';