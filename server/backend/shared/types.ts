import { ID } from "./id";

type PurposeData = {
    name: string;
    section?: string;
    recipient?: string;
};

export type StockQuery = {
    itemId: ID;
    quantity: number;
};

export type ProductQuery = {
    productId: ID;
    variations?: ID[];
};

export type ProductData = {
    productId: string;
    quantity: number;
    variations?: string[];
};

export type RequestData = {
    purposeData: PurposeData;
    productsData: ProductData[];
    total: string;
    returnDate: string;
    securityDeposit: string;
};
