export type Card = {
    nameOnCard: string;
    number: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
};

export function getCardData(): Card {
    return {
        nameOnCard: 'Test User',
        number: '4111111111111111',
        cvc: '123',
        expiryMonth: '12',
        expiryYear: '2030',
    };
}
