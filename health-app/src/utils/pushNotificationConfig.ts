import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

function setupPushNotification(
  handleNotification: (param: typeof PushNotification) => void,
): void {
  PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',

    onNotification(notification) {
      // console.log('NOTIFICATION:', notification);
      handleNotification(notification);
    },
  });
}

export { setupPushNotification };
