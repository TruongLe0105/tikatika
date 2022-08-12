import { Driver } from "./driver";
import { PaymentStatus, PaymentType } from "./payment";

export interface FoodOrder {
    deliveringAt?: number
    cookAt?: number
    completeAt?: number
    rateStar?: number,
    acceptAt?: number
    storeAcceptAt?: number,
    isCooked?: boolean
    createdAt?: number
    code?: string,
    id?: number
    moneyTotal?: number
    driver?: Driver,
    paymentType?: PaymentType,
    estimateTime?: string,
    moneyProduct?: number,
    point?: number,
    moneyBaseCustomer?: number
    matrix?: string,
    status?: OrderFoodStatus,
    duration?: number,
    distance?: number,
    note?: string,
    startLong?: number,
    startLat?: number,
    startName?: string,
    startAddress?: string,
    endLong?: number,
    endLat?: number,
    endName?: string,
    endAddress?: string,
    tip?: number,
    moneyRushHour?: number,
    moneyDistance?: number,
    moneyFinal?: number,
    moneyDiscount?: number,
    moneyIncome?: number
    isUseBalancePromotion?: boolean,
    details: Food[]
    orderDetails?: Food[]
    store?: FoodShop
    paymentStatus?: PaymentStatus
}

export enum OrderFoodStatus {
    FindDriver = 'FIND_DRIVER',
    AcceptOrder = 'ACCEPT_ORDER',
    Delivering = 'DELIVERING',
    NotFoundDriver = 'NOT_FOUND_DRIVER',
    Complete = 'COMPLETE',
    DriverCancel = 'DRIVER_CANCEL',
    Cook = 'COOK',
    CustomerCancel = 'CUSTOMER_CANCEL',
    AdminCancel = 'ADMIN_CANCEL',
    Waiting = 'WAITING',
    StoreCancel = 'STORE_CANCEL',
    PendingPayment = 'PENDING_PAYMENT'
}



export const OrderFoodStatusTrans = {
    [OrderFoodStatus.FindDriver]: 'Đang tìm bác tài',
    [OrderFoodStatus.Cook]: 'Đang chế biến',
    [OrderFoodStatus.AcceptOrder]: 'Đang đến lấy hàng',
    [OrderFoodStatus.Complete]: 'Hoàn tất',
    [OrderFoodStatus.Delivering]: 'Đang giao hàng',
    [OrderFoodStatus.DriverCancel]: 'Hủy',
    [OrderFoodStatus.CustomerCancel]: 'Hủy',
    [OrderFoodStatus.AdminCancel]: 'Admin hủy',
    [OrderFoodStatus.Waiting]: 'Đợi xác nhận đơn',
    [OrderFoodStatus.StoreCancel]: 'Cửa hàng hủy',
    [OrderFoodStatus.PendingPayment]: 'Chờ thanh toán',
}

export enum StoreStatus {
    Online = "ONLINE",
    Offline = "OFFLINE",
}

export type Menu = {
    id: number
    createdAt: number
    updatedAt: number
    name: string
    isDeleted: boolean
    priority: number
    store: FoodShop;
    products: Food[];
}

export type Food = {
    id?: number,
    name?: string,
    thumbnail?: string,
    originPrice?: number,
    finalPrice?: number,
    quantity?: number
    isOutOfStock?: boolean //hết món
    note?: string,
    description?: string
    product?: Food
    store?: any
    cookTime?: number
}



export interface FoodShop {
    id?: number
    createdAt?: number
    updatedAt?: number
    name?: string
    phone?: string
    description?: string
    username?: string
    password?: string
    address?: string
    lat?: number
    long?: number
    openTime?: string
    closeTime?: string
    thumbnail?: string
    isBlock?: boolean
    isClosed?: boolean
    isDeleted?: boolean
    totalStar?: number // Tong sao 
    totalRate?: number // So lan danh gia
    isFavorite?: boolean
    distance?: number
    status?: string
    categories?: any[]
    productMinPrice?: number
    productMaxPrice?: number
}