export interface Notification {
    type: string
    body: string
    title: string,
    id: number,
    createdAt?: number
    promotion?: Promotion
    isSeen?: boolean
}


export enum NotificationType {
    Order = 'ORDER',
    Chat = 'CHAT_CUSTOMER',
    News = 'NEWS',
    AddPoint = 'ADD_POINT',
    MinusPoint = 'MINUS_POINT'
}