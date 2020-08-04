import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import QuestionsRoutes from './questions.routes';

import { useAuth } from '../hooks/auth';

import {
  setupPushNotification,
  handleNotificationOpen,
} from '../utils/pushNotificationConfig';

setupPushNotification(handleNotificationOpen);

const Routes: React.FC = () => {
  const { user } = useAuth();

  if (user.id && user.userInfo.firstLogin) {
    return <QuestionsRoutes />;
  }

  return user.id ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
