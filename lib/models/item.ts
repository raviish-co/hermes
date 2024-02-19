export interface VariationValue {
    variationId: string;
    value: string;
}

export type ConditionStatus = "Bom" | "Mau";
interface Condition {
    status: ConditionStatus;
    comment?: string;
}
export interface ItemModel {
    itemId: string;
    name: string;
    price: string;
    categoryId: string;
    variationsValues?: VariationValue[];
    isUnique: boolean;
    quantity: number;
    condition?: Condition;
    total: string;
    securityDeposit: string;
}
