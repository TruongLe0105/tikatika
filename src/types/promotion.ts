import { FoodShop } from "./food-order";

export interface Promotion {
    dateCreated: number;
    dateUpdated: number;
    id: number;
    title: string;
    image: string;
    body: string;
    code: string;
    start: number;
    end: number;
    isBlock: boolean;
    conditionMinPrice: number;
    conditionMinDistant: number;
    discountType: string;
    discountValue: number;
    store: FoodShop
    description: string
    name: string
}