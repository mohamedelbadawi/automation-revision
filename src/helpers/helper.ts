export function getUniqueEmail() {
    return `${Date.now()}@test.com`
}
export function getPriceWithoutCurrency(priceWithCurrency: string):number {
    return parseFloat(priceWithCurrency.replace(/\D/g, ''));
}