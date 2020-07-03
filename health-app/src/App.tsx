import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';

import AppProvider from './hooks/index';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar backgroundColor="#EBF1F3" />

    <AppProvider>
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
