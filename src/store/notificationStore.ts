import { customerNotificationApi } from "@/api/customerNotification.api";
import { action, computed, makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { AsyncStorage } from "react-native";


class NotificationStore {
    constructor() {
        makeAutoObservable(this)
        makePersistable(this, { name: 'NotificationStore', properties: ['deletedNotificationIds', 'readNotificationIds', 'list'], storage: AsyncStorage });
    }
    readNotificationIds = []
    deletedNotificationIds = []
    query = {
        page: 1, limit: 10,
        total: 0
    }
    list: Notification[] = []
    isRefresh = false
    isFetchMore = false
    isFetching = false
    selected: Notification = null
    totalCurrent = 0
    totalUnseen = 0

    @action
    setSelected(notification: Notification) {
        this.selected = notification
    }

    @computed
    get totalNewNotification() {
        return this.list.reduce((prev, cur) => prev + (cur.isRead ? 0 : 1), 0)
    }

    @action
    setReadAll() {
        for (const item of this.list) {
            this.setRead(item)
        }
    }

    @action
    setRead(notification: Notification) {
        notification.isRead = true
        const find = this.readNotificationIds.find(id => id == notification.id)
        if (!find) {
            this.readNotificationIds.push(notification.id)
        }
    }

    @action
    setDeleted(notification: Notification) {
        const find = this.list.findIndex(e => e.id == notification.id)
        console.log('find', find);

        if (find > -1) {
            this.list.splice(find, 1)
            console.log('list', this.list.length, 'deletedNotificationIds', this.deletedNotificationIds.length);

            this.deletedNotificationIds.push(notification.id)
        }
    }

    @action
    fetchMoreList = async () => {
        try {
            if (this.totalCurrent != this.query.total && !this.isFetching) {
                this.query.page++
                this.isFetchMore = true
                this.isFetching = true
                const res = await customerNotificationApi.findAll(this.query)
                let notifications: Notification[] = res.data.customerNotifications
                for (const item of notifications) {
                    const find = this.readNotificationIds.some(id => id == item.id)
                    item.isRead = find
                }
                this.totalCurrent += res.data.customerNotifications.length
                notifications = notifications.filter(e => !this.deletedNotificationIds.some(id => e.id == id))
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
            const res = await customerNotificationApi.findAll(this.query)
            let notifications: Notification[] = res.data.customerNotifications
            for (const item of notifications) {
                const find = this.readNotificationIds.some(id => id == item.id)
                item.isRead = find
            }
            console.log('deletedNotificationIds', toJS(this.deletedNotificationIds));

            notifications = notifications.filter(e => !this.deletedNotificationIds.some(id => e.id == id))
            this.list = notifications
            this.query.total = res.data.total
            this.totalCurrent = res.data.customerNotifications.length
        } finally {
            this.isRefresh = false
            this.isFetching = false
        }

    }

    @action
    getTotalUnseen = async () => {
        const res = await customerNotificationApi.totalUnseen()
        this.totalUnseen = res.data.total
        // this.setBadgeCount(res.data.total)
    }




}

const notificationStore = new NotificationStore
export { notificationStore }





export interface Notification {
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
