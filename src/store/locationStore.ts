import { observable, action, computed, toJS, makeAutoObservable } from "mobx";
import request from "@/utils/request";
import { LatLng, Region } from "react-native-maps";
import * as apiMap from "@/api/maps";
import * as Location from "expo-location";
import { Navigation } from "@/utils/Navigation";

import { userStore } from "./userStore";
import { Loading } from "@/components/Loading/Loading";
import { Alert, AsyncStorage, PermissionsAndroid, Platform } from "react-native";
import { makePersistable } from "mobx-persist-store";
import { IAddress } from "@/types/address";
import { ScreenName } from "@/utils/enum";
import * as Sentry from "@sentry/react-native";

// API

export interface IDirection {
    distance: number;
    duration: number;
    matrix: string
}

class LocationStore {

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, { name: 'LocationStore', properties: ['lastRegion'], storage: AsyncStorage });
    }
    // OBSERVABLE
    @observable start: IAddress = {
        formattedAddress: "",
        longitude: 0,
        latitude: 0,
        route: "",
    };
    @observable end: IAddress;
    @observable isHasLocationCur: boolean = false
    @observable lastRegion: Region


    // COMPUTED
    // ACTION

    @action
    setStartAddress(address: IAddress) {
        this.start = address
    }

    getPermissionLocation = async () => {
        var { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
        if (status != "granted") {
            Navigation.navigate(ScreenName.AskLocation)
            return { permission: false, canAskAgain };
        }
        return { permission: true, canAskAgain };
    };

    @action
    async fetchPlaceByText(text: string, latLng?: LatLng): Promise<IAddress[]> {
        let res: any = await apiMap.findPlace(text, latLng)
        res = res.predictions
        let result: IAddress[] = res.map(e => {
            let tmp: IAddress = {
                formattedAddress: e.description,
                latitude: 0,
                longitude: 0,
                route: e.structured_formatting?.main_text,
                placeId: e.place_id
            }
            return tmp
        })
        return result
    }

    @action async fetchPlaceByPlaceId(placeId: string, formattedAddress: string, types: string[] = ['street_address']): Promise<IAddress> {
        const res: any = await apiMap.getDetail(placeId)
        let result = res.result
        const address = Array.isArray(types) && types.includes('street_address') ? formattedAddress : result.formatted_address;
        let tmp: IAddress = {
            formattedAddress: address,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            route: result.name,
        }
        return tmp
    }

    handleNoLocation = async (flag?) => {
        if ((!userStore.location.placeId || !userStore.location.latitude || !userStore.location.longitude || flag)) {
            try {
                await userStore.getLocation()
                await userStore.fetchLocation();
                locationStore.start = {
                    ...locationStore.start,
                    latitude: userStore.location.latitude,
                    longitude: userStore.location.longitude,
                    formattedAddress: userStore.location.formattedAddress,
                };
            }
            catch (error) {
                Alert.alert('error location', error)
            }
            finally {
                Loading.hide();
            }
        }
    };


    @action
    async fetchDirection(start: LatLng, end: LatLng): Promise<IDirection> {
        const res: any = await apiMap.getDirection(start, end)
        console.log('direction ne', res);

        let legs = res.routes[0].legs
        let distance: number = legs[0].distance.value / 1000
        let duration: number = Math.round(legs[0].duration.value / 60)
        let matrix = res.routes[0].overview_polyline.points
        let direction: IDirection = {
            distance: parseFloat(distance.toFixed(1)),
            duration,
            matrix
        }
        return direction
    }

    @action async getLocation() {
        try {
            const { permission } = await locationStore.getPermissionLocation();
            if (!permission) {
                Navigation.navigate(ScreenName.AskLocation);
                throw "";
            }
            let location: Location.LocationObject
            if (Platform.OS == 'ios') {
                location = await Location.getLastKnownPositionAsync()
            }
            else {
                location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Lowest,
                });
            }
            let latLng: LatLng = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            return latLng
        } catch (error) {
            Sentry.captureMessage(error.message)
            Sentry.captureException(error)
        }
    }

    @action
    async fetchLocationByLatLng(data: Partial<LatLng>): Promise<IAddress> {
        try {
            let route: string = '', street_number: string = '', city: string = '', district: string = '', ward: string = ''
            const result: any = await apiMap.getPlaceByLatLng(data)
            result.results[0].address_components.forEach(element => {
                element.types.forEach(type => {
                    if (type == 'route') {
                        route = element.long_name
                    }
                    if (type == 'street_number') {
                        street_number = element.long_name
                    }
                    if (type == 'administrative_area_level_1') {
                        city = element.long_name
                    }
                    if (type == 'administrative_area_level_2') {
                        district = element.long_name
                    }
                });
            });
            let tmp: IAddress = {
                city,
                district,
                ward,
                route: street_number + ' ' + route,
                latitude: result.results[0].geometry.location.lat,
                longitude: result.results[0].geometry.location.lng,
                formattedAddress: result.results[0].formatted_address,
                placeId: result.results[0].place_id
            }
            return tmp
        } catch (error) {

        }

    }



}

let locationStore = new LocationStore()

export { locationStore }
