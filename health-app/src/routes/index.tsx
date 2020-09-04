import React from 'react';

import AuthRoutes from './auth.routes';
import DrawerRoutes from './drawer.routes';
import QuestionsRoutes from './questions.routes';

import { useAuth } from '../hooks/auth';

import {
  setupPushNotification,
  handleNotificationOpen,
} from '../utils/pushNotificationConfig';

setupPushNotification(handleNotificationOpen);

const Routes: React.FC = () => {
  const { user } = useAuth();

  if (user.id && user.firstLogin) {
    return <QuestionsRoutes />;
  }

  return user.id ? <DrawerRoutes /> : <AuthRoutes />;
};

export default Routes;
