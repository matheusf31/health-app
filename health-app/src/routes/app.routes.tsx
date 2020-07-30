import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Registry from '../pages/Registries';
import Alarm from '../pages/Alarms';

interface ITabBarIcon {
  focused: boolean;
}

const App = createBottomTabNavigator();

const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#fff',
  inactiveTintColor: '#AEB4B6',
  style: {
    backgroundColor: '#146ba8',
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
    height: Platform.OS === 'ios' ? '10.5%' : 60,
  },
  labelStyle: {
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
  },
};

const registryRoutesOptions = {
  tabBarLabel: 'Registros',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon
      name="pencil-outline"
      size={20}
      color={focused ? '#fff' : '#AEB4B6'}
    />
  ),
};

const alarmRoutesOptions = {
  tabBarLabel: 'Alarmes',
  tabBarIcon: ({ focused }: ITabBarIcon) => (
    <Icon name="alarm" size={20} color={focused ? '#fff' : '#AEB4B6'} />
  ),
};

const AppRoutes: React.FC = () => (
  <App.Navigator tabBarOptions={tabBarOptions}>
    <App.Screen
      name="Registry"
      component={Registry}
      options={registryRoutesOptions}
    />
    <App.Screen name="Alarm" component={Alarm} options={alarmRoutesOptions} />
  </App.Navigator>
);

export default AppRoutes;
