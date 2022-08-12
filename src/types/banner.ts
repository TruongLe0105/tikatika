import { LatLng } from "react-native-maps";

export interface Banner extends Partial<LatLng> {
    id: number
    createdAt: number
    updatedAt: number
    title: string
    body: string
    thumbnail: string
    isShow: boolean
    isDeleted: boolean
    priority: number
}