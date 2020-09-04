import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#EBF1F3',
      },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
