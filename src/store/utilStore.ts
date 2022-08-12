import { utilApi } from "@/api/util.api";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { AsyncStorage } from "react-native";


class UtilStore {

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, { name: 'UtilStore', properties: ['list'], storage: AsyncStorage });
    }

    list: Util[] = []

    @action
    fetchList() {
        utilApi.findAll({}).then(res => {
            this.list = res.data.utils
        })
    }
}

const utilStore = new UtilStore


export interface Util {
    id: number
    createdAt: number
    updatedAt: number
    name: string
    image: string,
    imageActive: string
}


export { utilStore }