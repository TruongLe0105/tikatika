import { LocalStorage } from '@/utils/LocalStorage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export type Subscription = {
    remove: () => void;
};


export class ExpoNotificationService {
    onNotification
    private subOnNotification: Subscription
    onInteract
    private subOnInteract: Subscription

    constructor() {
        this.initListener()
    }

    unSub() {
        this.subOnNotification?.remove()
        this.subOnInteract?.remove()
    }

    static async register(onSuccess) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status;
        }

        try {
            // Get the token that uniquely identifies this device
            let token = "";
            if (Platform.OS == "ios") {
                let apns = await Notifications.getDevicePushTokenAsync();
                token = apns.data;
            } else {
                const res = await Notifications.getExpoPushTokenAsync({
                    experienceId: "@bmd_solutions/phong-tro-bmd",
                });
                token = res.data;
            }
            typeof onSuccess == 'function' && onSuccess(token)
            await LocalStorage.set("expoToken", token);
        } catch (error) {
            console.log("error register token", error);
        }
    }

    static createChannel() {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
            sound: 'eventually.mp3', // <- for Android 8.0+, see channelId property below
        }).then(() => {
            console.log('create channel default ok');

        }).catch(err => {
            console.log('create channel default err', err);
        });
    }

    private initListener() {
        // when app running
        this.subOnNotification = Notifications.addNotificationReceivedListener(notification => {
            console.log('subOnNotification');
            if (typeof this.onNotification == 'function') {
                let data
                if (Platform.OS == "ios") {
                    data = notification.request.content.data.body;
                } else {
                    data = notification.request.content.data;
                }
                this.onNotification(data)
            }
        })

        //when interact 
        this.subOnInteract = Notifications.addNotificationResponseReceivedListener(ev => {
            console.log('this.subOnInteract');
            if (typeof this.onInteract == 'function') {
                let data
                if (Platform.OS == "ios") {
                    data = ev.notification.request.content.data.body;
                } else {
                    data = ev.notification.request.content.data;
                }
                this.onInteract(data, true)
            }
        })
    }
}