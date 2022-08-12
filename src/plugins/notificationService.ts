import { Platform } from 'react-native';
import { LocalStorage } from '@/utils/LocalStorage';
import PushNotification, { PushNotification as PushNotificationType } from 'react-native-push-notification';
import { firebase } from "@react-native-firebase/messaging";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export class NotificationService {
    private topicName = 'phong-tro'
    private lastId; private lastChannelCounter
    private _onReceive
    private _onRegister
    private _lastNotification
    private _onReceiveBackground
    private data

    private subscribeOnMsg
    private subscribeOnClick
    private subscribeBackground
    private _onNotificationLocalClick

    _isMessageForgerRound
    constructor(isMessageForgerRound?) {
        this.lastId = 0;
        this.lastChannelCounter = 0;
        this.createChannels();
        this._isMessageForgerRound = isMessageForgerRound
        console.log('_isMessageForgerRound', this._isMessageForgerRound);
        PushNotification.getChannels(function (channels) {
            console.log('channel ready', channels);
        });
        this.initListener()
    }

    static async setNotificationToken(token) {
        await LocalStorage.set("fcmToken", token);
    }

    static async checkPermission() {
        const hasPermission = await firebase.messaging().hasPermission()
        console.log('has permission notification', hasPermission);

        if (hasPermission == firebase.messaging.AuthorizationStatus.NOT_DETERMINED || hasPermission == firebase.messaging.AuthorizationStatus.DENIED) {
            await firebase.messaging().requestPermission()
        }
    }

    unSubscribe() {
        this.subscribeOnMsg?.()
        this._onNotificationLocalClick = null
    }

    initListener() {
        //message foreground
        this.subscribeOnMsg = firebase.messaging().onMessage(remoteMessage => {
            console.log('remoteMessage', remoteMessage);
            if (typeof this._onReceive == 'function') {
                this._onReceive(remoteMessage?.data)
            }
            console.log('this._isMessageForgerRound', this._isMessageForgerRound);
            // alert(JSON.stringify(PushNotificationIOS))
            if (Platform.OS == 'ios' && this._isMessageForgerRound && typeof this._isMessageForgerRound == 'boolean') {
                console.log('addNotificationRequest');

                PushNotificationIOS.addNotificationRequest({
                    title: remoteMessage.notification.title,
                    body: remoteMessage.notification.body,
                    id: remoteMessage.messageId,
                    //@ts-ignore
                    sound: remoteMessage.notification.ios?.sound,
                    userInfo: remoteMessage?.data
                })
            }

            if (Platform.OS == 'android' && this._isMessageForgerRound && typeof this._isMessageForgerRound == 'boolean') {
                PushNotification.presentLocalNotification({
                    soundName: remoteMessage.notification?.android?.sound,
                    title: remoteMessage.notification?.title,
                    message: remoteMessage.notification?.body,
                    channelId: remoteMessage.notification?.android?.channelId,
                    userInfo: remoteMessage.data
                })
            }
        })
        // Register background handler

        Platform.OS == 'android' && firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage?.data);
            if (typeof this._onReceiveBackground == 'function') {
                this._onReceiveBackground(remoteMessage?.data, true)
            }
        });
    }

    onLastNotification = (cb) => {
        //message when open app
        firebase.messaging().getInitialNotification().then((remoteMessage) => {
            console.log('onLastNotification', remoteMessage?.data);
            if (typeof cb == 'function') {
                cb(remoteMessage?.data, true)
            }
        })
    }

    static async getNotificationToken() {
        let token = {
            fcmToken: '',
            expoToken: ''
        }
        token.fcmToken = await LocalStorage.get("fcmToken");
        return token
    }

    static setBadge = (count = 0) => {
        console.log('set badge', count);
        PushNotification.setApplicationIconBadgeNumber(count)
    }

    onNotification = (cb) => {
        // onNotification foreground
        this._onReceive = cb

    }

    onNotificationLocalClick = (cb) => {
        this._onNotificationLocalClick = cb
        // notification local
        if (Platform.OS == 'android') {
            PushNotification.configure({
                onNotification: (notification) => {
                    if (notification.userInteraction) {
                        console.log('on localNotificationListener', notification.data);
                        this._onNotificationLocalClick?.(notification.data, true)
                    }
                }
            })
        }
        else {
            PushNotificationIOS.addEventListener('localNotification', (notification) => {
                const data = notification.getData()
                console.log('on localNotificationListener ios', notification.getData());
                if (data.userInteraction) {
                    this._onNotificationLocalClick?.(data, true)
                }
            })
        }
    }


    onNotificationClick = (cb) => {
        // onNotification click
        this.subscribeOnClick = firebase.messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('onNotificationOpenedApp', remoteMessage?.data);
            cb(remoteMessage?.data, true)
        })
    }

    static onRegister = async (cb?: (token: string) => void) => {
        const token = await firebase.messaging().getToken()
        console.log('Register fcm success', token);
        cb?.(token)
        await NotificationService.setNotificationToken(token)
    }

    onNotificationBackground = (cb) => {
        this._onReceiveBackground = cb
    }

    createChannels() {
        PushNotification.createChannel(
            {
                channelId: "new-order", // (required)
                channelName: `new-order`, // (required)
                channelDescription: "new-order", // (optional) default: undefined.
                soundName: "notification.wav", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel 'new-order' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.createChannel(
            {
                channelId: "default", // (required)
                channelName: `Default channel`, // (required)
                channelDescription: "A default channel", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }
}

export const lastNotificationService = new NotificationService(true)
