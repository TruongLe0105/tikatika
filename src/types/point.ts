interface TransactionPoint {
    value: number,
    type: 'minus' | 'add',
    content: string,
    createdAt: number
}