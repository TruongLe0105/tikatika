import { FoodShop } from "./food-order";

export interface Video {
    id: number
    createdAt: number
    updatedAt: number
    url: string
    description: string
    isDeleted: boolean
    priority: number
    store: FoodShop;
    thumbnail: string
    view: number
}