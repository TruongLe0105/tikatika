import { configApi } from "@/api/config.api";
import { Configuration, ConfigurationParams } from "@/types/configuration";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { AsyncStorage } from "react-native";


class ConfigStore {
    constructor() {
        makeAutoObservable(this)
        makePersistable(this, { name: 'ConfigStore', properties: ['ratioPoint'], storage: AsyncStorage });
    }

    ratioPoint: Configuration = {}
    tryAgain = 5
    hotLine: string

    @action
    resetTryAgain() {
        this.tryAgain = 5
    }

    fetchRatioPoint = async () => {
        if (this.tryAgain == 0) {
            return
        }
        try {

            const res = await configApi.findAll({ param: ConfigurationParams.RatioPoint })
            this.ratioPoint = res.data
        } catch (err) {
            this.tryAgain--;
            setTimeout(() => {
                this.fetchRatioPoint()
            }, 5 * 1000);

        } finally {

        }

    }

    fetchHotline = async () => {
        if (this.tryAgain == 0) {
            return
        }
        try {

            const res = await configApi.findAll({ param: ConfigurationParams.Hotline })
            this.hotLine = res.data.value
        } catch (err) {
            this.tryAgain--;
            setTimeout(() => {
                this.fetchHotline()
            }, 5 * 1000);

        } finally {

        }

    }

}

const configStore = new ConfigStore()


export { configStore }