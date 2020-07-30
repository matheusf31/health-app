import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  requestPermissions: Platform.OS === 'ios',

  // (optional) Called when Token is generated (iOS and Android)
  onRegister(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification(notification) {
    console.log('NOTIFICATION:', notification);

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});
