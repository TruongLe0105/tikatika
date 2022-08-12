import { observable, action, computed, toJS, makeAutoObservable } from "mobx";
import { LocalStorage } from "@/utils/LocalStorage";
import appStore from "./appStore";
import { LatLng } from "react-native-maps";
import { persist } from "mobx-persist";
import jwt_decode from "jwt-decode";
import { userApi } from "@/api/user";
import { makePersistable } from 'mobx-persist-store';
import { authApi } from "@/api/auth";
import { AsyncStorage } from "react-native";

import { locationStore } from "./locationStore";
import { IAddress } from "@/types/address";


export const LocalUserLocation = 'LocalUserLocation'


export interface IUserLocation {
  formattedAddress: string;
  location: LatLng;
  route: string;
  placeId?: string
}

export enum GenderType {
  Male = "MALE",
  Female = "FEMALE",
}

class UserStore {
  // OBSERVABLE

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'UserStore', properties: ['info', 'location'], storage: AsyncStorage });
  }
  @observable info: UserInfo = {

  }
  @observable location: IAddress = {
    formattedAddress: "",
    longitude: 0,
    latitude: 0,
    route: "",
  };


  @action setInfo(info) {
    this.info = info;
  }


  @action
  async login({ phone, password }) {
    const expoToken = await LocalStorage.get("expoToken");
    try {
      const res = await authApi.login({ phone, password, expoToken });
      if (!res.status) {
        return false;
      }
      console.log('token login ne', res.data.token);

      const { data: { token } } = res
      await LocalStorage.set("token", token);
      appStore.setToken(token)
      this.getInfo();
    } finally {
    }
  }

  @action
  async getInfo() {
    try {
      const fcmToken = await LocalStorage.get('fcmToken')
      const res = await authApi.profile({ fcmToken })
      this.info = res.data;
    } catch (error) {
    }
  }

  @action
  async getLocation() {

    let latLng: LatLng = await locationStore.getLocation()
    this.location.latitude = latLng.latitude
    this.location.longitude = latLng.longitude
  }

  @action
  async fetchLocation() {
    try {
      const res = await locationStore.fetchLocationByLatLng(this.location);
      this.setLocation(res)
      // this.location = {
      //   formattedAddress: res.formattedAddress,
      //   latitude: res.latitude,
      //   longitude: res.longitude,
      //   placeId: res.formattedAddress,
      //   route: res.route,
      // };
      // await LocalStorage.set(LocalUserLocation, JSON.stringify(this.location));
    } catch (error) {

    }

  }

  @action
  async setLocation(location: IAddress) {
    this.location = {
      formattedAddress: location.formattedAddress,
      latitude: location.latitude,
      longitude: location.longitude,
      placeId: location.formattedAddress,
      route: location.route,
    };

  }


  @action
  async logout() {

    appStore.setToken(null)
  }


}

const userStore = new UserStore();
export { userStore };



export interface Customer {
  id?: string
  name?: string
}



export interface AddressWard {
  id: number
  createdAt: number
  updatedAt: number
  isBlock: boolean
  priority: number
  parentCode: string
  code: string
  pathWithType: string
  path: string
  nameWithType: string
  type: string
  slug: string
  name: string
  feeDelivery: number
  customers: Customer[];
}


export type UserInfo = {
  address?: string,
  avatar?: string,
  code?: string,
  city?: string,
  country?: string,
  createdAt?: string,
  district?: string,
  dob?: string,
  email?: string,
  name?: string,
  gender?: string,
  id?: number,
  balance?: number // số điểm ví
  password?: string,
  phone?: string,
  username?: string,
  ward?: string,

  addressLong?: number,
  addressLat?: number,
  placeId?: string,
  route?: string
  isAcceptNotification?: boolean,
}


export interface CustomerProfile {
  id: number
  createdAt: number
  updatedAt: number
  imageIdCardBefore: string
  imageIdCardAfter: string
  companyName: string
  taxCode: string
  representationName: string
  companyAddress: string
  imageBusinessLicense: string
}




export enum KYCStatus {
  Waiting = 'WAITING',
  Submitted = 'SUBMITTED',
  Personal = 'PERSONAL',
  Company = 'COMPANY'
}



export interface AddressDistrict {
  id: number
  createdAt: number
  updatedAt: number
  isBlock: boolean
  priority: number
  parentCode: string
  code: string
  pathWithType: string
  path: string
  nameWithType: string
  type: string
  slug: string
  name: string
  feeDelivery: number
  customers: Customer[];

}


export interface AddressCity {
  id: number
  createdAt: number
  updatedAt: number
  isBlock: boolean
  priority: number
  code: string
  nameWithType: string
  type: string
  slug: string
  name: string
  feeDelivery: number
  customers: Customer[];
}
