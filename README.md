# HƯỚNG DẪN CHẠY ỨNG DỤNG TIKA DELIVERY

Giới thiệu công nghệ sử dung:

- Ngôn ngữ lập trình: React Native.

- Cài đặt [Nodejs](https://nodejs.org/)
- Cài đặt [Yarn](https://classic.yarnpkg.com/)
- Cài đặt [Xcode](https://apps.apple.com/app/xcode/id497799835?mt=12)
- Cài đặt [AndroidStudio](https://developer.android.com/studio)
- Cài đặt [Cocoapods](https://cocoapods.org/)

### Cách cài đặt

Run app android

```sh
$ yarn
$ yarn start
$ Open Android Studio -> Select Import Project (Gradle, Eclipse ADT, etc.)
$ Select folder android
$ Wait android auto install package
$ Install sdk 9.0: Android Studio -> Preferences -> Appearance & Behavior -> System Settings -> Android SDK ->  SDK Platforms -> Select Android 9.0
$ Run app: Run -> Run app
```

Run app ios

```sh
$ yarn
$ yarn start
$ cd ios
$ pod install
$ Open TikaTikaDriverBMD.xcworkspace
$ Add Account: Xcode -> Preferences -> Accounts
$ Product -> Run
```

### Tài liệu tham khảo thêm

| Tài liệu    | Liên kết                                |
| ----------- | --------------------------------------- |
| Expo        | [docs.expo.io/workflow/expo-cli/][expo] |
| ReactNative | [https://reactnative.dev/][reactnative] |
| React       | [https://reactjs.org/][react]           |

[expo]: https://docs.expo.io/workflow/expo-cli/
[reactnative]: https://reactnative.dev/
[react]: https://reactjs.org/
