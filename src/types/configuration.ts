

export interface Configuration {
    id?: number,
    createdAt?: number,
    updatedAt?: number,
    param?: string,
    value?: number,
    note?: string
    paramType?: string
}

export enum ConfigurationParams {
    CommissionOrder = 'COMMISSION_ORDER',
    MinPrice = 'MIN_PRICE',
    KmMinPrice = 'KM_MIN_PRICE',
    PricePerKM = 'PRICE_PER_KM',
    RatioPoint = 'RATIO_POINT',
    RewardRegister = 'REWARD_REGISTER',
    Hotline = 'HOTLINE',
}