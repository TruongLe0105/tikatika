import { UserInfo } from "@/store/userStore";

export interface Affiliate {
    id: number;
    createdAt: number
    updatedAt: number
    pointF1: number;
    pointF2: number;
    pointF3: number;
    pointF4: number;
    pointF5: number;
    children: UserInfo;
    parentF5?: UserInfo;
    parentF4?: UserInfo;
    parentF3?: UserInfo;
    parentF2?: UserInfo;
    parentF1?: UserInfo;
    pointAdd: number;
    level: number | string;
}