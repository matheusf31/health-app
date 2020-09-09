import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Imc from '../pages/Home/Imc';

const HomeScreen = createStackNavigator();

const HomeScreenRoutes: React.FC = () => (
  <HomeScreen.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#EBF1F3',
      },
    }}
  >
    <HomeScreen.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />

    <HomeScreen.Screen
      name="Imc"
      component={Imc}
      options={{
        headerTitle: 'Seu IMC',
        headerTransparent: true,
        headerTintColor: '#146ba8',
      }}
    />
  </HomeScreen.Navigator>
);

export default HomeScreenRoutes;
