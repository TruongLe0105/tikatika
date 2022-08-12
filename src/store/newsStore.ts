import { newsApi } from "@/api/news.api";
import { action, computed, makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { AsyncStorage } from "react-native";
import { Notification } from "./notificationStore";


class NewsStore {
    constructor() {
        makeAutoObservable(this)
    }
    query = {
        page: 1, limit: 10,
        total: 0,
        newsCategoryId: null
    }
    list: News[] = []
    isRefresh = false
    isFetchMore = false
    isFetching = false
    selected: News = null
    totalCurrent = 0

    @action
    setSelected(news: News) {
        this.selected = news
    }

    @action
    fetchMoreList = async () => {
        try {
            if (this.list.length < this.query.total && !this.isFetching) {
                this.query.page++
                this.isFetchMore = true
                this.isFetching = true
                const res = await newsApi.findAll(this.query)
                this.list = [...this.list, ...res.data.news]
                this.query.total = res.data.total
            }
        } finally {
            this.isFetchMore = false
            this.isFetching = false
        }

    }

    @action
    refreshList = async () => {
        try {
            this.isRefresh = true
            this.isFetching = true
            this.query.page = 1
            const res = await newsApi.findAll(this.query)
            this.list = res.data.news
            this.query.total = res.data.total
        } finally {
            this.isRefresh = false
            this.isFetching = false
        }

    }

    @action
    setNewsCategoryId(id: number) {
        this.query.newsCategoryId = id
    }


}

const newsStore = new NewsStore
export { newsStore }





export interface News {
    id: number
    createdAt: number
    updatedAt: number
    title: string
    thumbnail: string
    body: string
    image: string
    isDeleted: boolean
    notifications: Notification[];

}