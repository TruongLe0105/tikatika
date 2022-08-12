import { UserInfo } from "@/store/userStore";
import { FoodShop } from "./food-order";

export interface Review {
    id: number
    createdAt: number
    updatedAt: number
    star: number
    comment: string
    image: string
    isReported: boolean
    isDeleted: boolean
    store: FoodShop;
    customer: UserInfo;
}