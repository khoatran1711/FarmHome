import React, {Component} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import messaging from '@react-native-firebase/messaging';
import {AuthenticationActions} from '../state/authentication/authentication.state';
import {RootStore, RootStoreType} from '../domain/store';
import {globalNavigate} from '../utilities/navigator-utilities';
import {ScreenName} from '../constants/screen-name.constant';
import {AuthenticationSelectors} from '../state/authentication/authentication.selector';
import {useRootSelector} from '../domain/hooks';
import {HttpResult, HttpService} from '../../Services/http.services';
import {
  APPLICATION_JSON,
  AUTHORIZATION_BEARER,
  AUTHORIZATION_HEADER,
  CONTENT_TYPE,
  URL_BASE,
} from '../../Services/url.constant';
import {
  NotificationResponse,
  URL_GET_NOTIFICATIONS,
} from '../Screen/Models/notification.model';
import {OrderService} from './orders.service';
import {PopupShow} from '../utilities/help-utilities';
import {NotificationType} from '../constants/notification-type.constant';

// var PushNotification = require("react-native-push-notification");

export default class PushController extends Component {
  componentDidMount() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      //console.log('Message handled in the background!', remoteMessage);
    });

    messaging().registerDeviceForRemoteMessages();

    messaging().onMessage(async remoteMessage => {
      // Display a local notification
      PushNotification.localNotification({
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body || '',
        smallIcon: 'ic_notification',
        data: remoteMessage?.data,
      });
    });

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
        const store = RootStore;
        store.dispatch(AuthenticationActions.setDeviceToken(token?.token));
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        const navigateOrder = orderId => {
          const store: RootStoreType = RootStore;
          const token = AuthenticationSelectors.tokenSelector(store.getState());

          if (token && orderId !== null && orderId !== undefined) {
            globalNavigate(ScreenName.ProductWaitingScreen, {
              orderId: orderId,
            });
          }
        };

        if (notification.foreground) {
          if (notification?.data?.type === NotificationType.OrderAccept) {
            const orderService = new OrderService();
            orderService.resetWaitingList();
            orderService.resetHistoryList();
          }

          if (notification?.data?.type === NotificationType.OrderChange) {
            const orderService = new OrderService();
            orderService.resetWaitingList();
          }

          !notification?.userInteraction
            ? Toast.show({
                type: 'orderToast',
                text1: notification?.title,
                text2: notification?.message?.toString(),
                props: {
                  id: notification?.data?.id,
                  image: notification?.bigPictureUrl,
                  onClick: () => navigateOrder(notification?.data?.id),
                },
              })
            : navigateOrder(notification?.data?.id);
        } else {
          navigateOrder(notification?.data?.id);
        }

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  }

  render() {
    return null;
  }
}

export class NotificationService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    const token = AuthenticationSelectors.tokenSelector(this.store.getState());
    if (token) {
      this.httpService = new HttpService({
        [CONTENT_TYPE]: APPLICATION_JSON,
        [AUTHORIZATION_HEADER]: `${AUTHORIZATION_BEARER} ${token}`,
      });
    } else {
      this.httpService = new HttpService({
        [CONTENT_TYPE]: APPLICATION_JSON,
      });
    }
  }

  getAllNotifications(
    userId: number,
  ): Promise<HttpResult<NotificationResponse[]>> {
    const url = URL_BASE + URL_GET_NOTIFICATIONS + userId;

    return this.httpService.get<any>(url);
  }
}
