import { observable, action, computed, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { AsyncStorage } from "react-native";

class appStore {

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, { name: 'appStore', properties: ['token', 'isOpenAppReview'], storage: AsyncStorage });
  }

  @observable token = "";
  @observable listData = [];
  @observable total = 0;
  @observable loading = false;
  @observable visibleModalDriver = false
  @observable isInitRootStore = false
  @observable isOpenAppReview = false
  @observable loadSplashVideo = false

  @action setIsOpenAppReview(isOpen: boolean) {
    this.isOpenAppReview = isOpen
  }

  @action setLoadSplashVideo(isLoad: boolean) {
    this.loadSplashVideo = isLoad
  }


  @action setToken(token) {
    this.token = token;
  }

  @action
  setLoading(loading) {
    this.loading = loading;
  }

  @action
  showModalDriver(visible) {
    this.visibleModalDriver = visible;
  }

}

export default new appStore();
