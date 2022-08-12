import { foodOrderApi } from "@/api/foodOrder.api";
import { foodOrderStore } from "@/store/foodOrderStore";
import { Navigation } from "@/utils/Navigation";
import { ScreenName } from "@/utils/enum";
import { NotificationType } from "@/types/notification";
import { newsApi } from "@/api/news.api";
import { notificationStore } from "@/store/notificationStore";




const handleNotifyChatOrder = async (data, trigger) => {
  if (trigger) {
    console.log('handleNotifyChatOrder', data.chat);

    const chat = JSON.parse(data.chat)
    const res = await foodOrderApi.findOne(data.orderId)
    foodOrderStore.setSelected(res.data)
    requestAnimationFrame(() => {

      Navigation.navigate(ScreenName.Chat, {
        name: res.data.driver.name,
        avatar: res.data.driver.avatar,
      })
    })
  }
}

const handleNotificationOrder = async (data, trigger) => {
  if (trigger) {
    const res = await foodOrderApi.findOne(data.orderId)
    foodOrderStore.setSelected(res.data)
    requestAnimationFrame(() => {

      Navigation.navigate(ScreenName.FoodOrderDetail)
    })
  }
}

const handleNewsNotification = async (data, trigger) => {
  console.log('handleNewsNotification:', data.newsId)
  if (trigger) {
    const res = await newsApi.findOne(data.newsId)
    requestAnimationFrame(() => {
      Navigation.navigate(ScreenName.NewsDetail, { news: res.data })

    })
  }
}

const handlePoint = async (data, trigger) => {
  if (trigger) {
    requestAnimationFrame(() => {

      Navigation.navigate(ScreenName.MyPoint)
    })
  }
}

export const switchNotify = (data, trigger?) => {
  notificationStore.getTotalUnseen();
  try {
    const type: NotificationType = data.type;
    console.log('switchNotify ne', data, 'trigger', trigger);
    switch (type) {
      case NotificationType.Order:
        handleNotificationOrder(data, trigger)
        break;
      case NotificationType.Chat:
        handleNotifyChatOrder(data, trigger);
        break;
      case NotificationType.News:
        handleNewsNotification(data, trigger);
        break;
      case NotificationType.AddPoint:
      case NotificationType.MinusPoint:
        handlePoint(data, trigger)
        break
    }
  } catch (error) {

  }
}