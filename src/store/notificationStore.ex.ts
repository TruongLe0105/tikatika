import { notificationApi } from "@/api/notification.api";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { AsyncStorage } from "react-native";


class NotificationStore {
    constructor() {
        makeAutoObservable(this)
        makePersistable(this, { name: 'NotificationStore', properties: ['readNotificationIds', 'list'], storage: AsyncStorage });
    }
    readNotificationIds = []
    query = {
        page: 1, limit: 10,
        total: 0
    }
    list: Notification[] = []
    isRefresh = false
    isFetchMore = false
    isFetching = false


    @action
    setRead(notification: Notification) {
        notification.isRead = true
        this.readNotificationIds.push(notification.id)
    }

    @action
    fetchMoreList = async () => {
        try {
            if (this.list.length != this.query.total && !this.isFetching) {
                this.query.page++
                this.isFetchMore = true
                this.isFetching = true
                const res = await notificationApi.findAll(this.query)
                const notifications: Notification[] = res.data.notifications
                for (const item of notifications) {
                    const find = this.readNotificationIds.some(id => id == item.id)
                    item.isRead = find
                }
                this.list = [...this.list, ...notifications]
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
            const res = await notificationApi.findAll(this.query)
            const notifications: Notification[] = res.data.notifications
            for (const item of notifications) {
                const find = this.readNotificationIds.some(id => id == item.id)
                item.isRead = find
            }
            this.list = res.data.notifications
            this.query.total = res.data.total
        } finally {
            this.isRefresh = false
            this.isFetching = false
        }

    }




}

const notificationStore = new NotificationStore






interface Notification {
    id: number
    createdAt: number
    updatedAt: number
    title: string
    body: string
    isDeleted: boolean
    type: string
    publishAt: number
    isRead?: boolean
    // customerNotifications: CustomerNotification[];
    // news: News; 
    // post: Post;
}
