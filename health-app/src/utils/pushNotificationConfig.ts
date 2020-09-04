import { Platform } from 'react-native';
import PushNotification, {
  PushNotification as IPushNotification,
} from 'react-native-push-notification';

import { interactionRequest } from '../store/modules/notification/actions';

import { store } from '../store';

interface INotification extends IPushNotification {
  userInfo: {
    category: string;
  };
}

function handleNotificationOpen(notification: INotification): void {
  // console.log(notification);

  // disparar uma action
  store.dispatch(
    interactionRequest({
      category: notification.userInfo.category,
    }),
  );
}

function setupPushNotification(
  handleNotification: (param: INotification) => void,
): void {
  PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',

    onNotification(notification) {
      handleNotification(notification as INotification);
    },
  });
}

export { setupPushNotification, handleNotificationOpen };
