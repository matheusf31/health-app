import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GlycemicControl from '../pages/GlycemicControl';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#EBF1F3',
      },
      headerShown: false,
    }}
  >
    <App.Screen name="GlycemicControl" component={GlycemicControl} />
  </App.Navigator>
);

export default AppRoutes;
