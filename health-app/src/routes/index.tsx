import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

import { setupPushNotification } from '../utils/pushNotificationConfig';
import { interactionRequest } from '../store/modules/notification/actions';

import { store } from '../store';

function handleNotificationOpen(notification): void {
  console.log(notification);

  // disparar uma action
  store.dispatch(
    interactionRequest({
      category: notification.userInfo.category,
    }),
  );
}

setupPushNotification(handleNotificationOpen);

const Routes: React.FC = () => {
  const { user } = useAuth();

  return user.id ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
