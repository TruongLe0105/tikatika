import { LatLng } from "react-native-maps";

export interface IAddress extends Partial<LatLng> {
    route?: string,
    placeId?: string,
    formattedAddress?: string,
    types?: string[],
    city?: string,
    district?: string,
    ward?: string,
}