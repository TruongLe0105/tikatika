export enum PaymentType {
    Cash = 'CASH',
    VnPay = 'VNPAY',
    Momo = 'MOMO',
    Point = 'POINT'
}

export const PaymentTypeTrans = {
    [PaymentType.Cash]: 'Tiền mặt',
    [PaymentType.Momo]: 'Momo',
    [PaymentType.VnPay]: 'VNPay',
    [PaymentType.Point]: 'Điểm'
}

export enum PaymentStatus {
    Pending = 'PENDING',
    Complete = 'COMPLETE',
    Fail = 'FAIL'
}