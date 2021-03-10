export default interface CurrencyType {
    disclaimer: string;
    date: string;
    timestamp: number;
    base: string;
    rates: Array<CurrencyRateType>;
}

export interface CurrencyRateType {
    currency: string;
    value: number;
}