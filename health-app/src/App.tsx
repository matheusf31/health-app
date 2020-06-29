import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, StatusBar } from 'react-native';

import AppProvider from './hooks/index';

import Routes from './routes';

// import { Container } from './styles';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar backgroundColor="#EBFDFF" />

    <AppProvider>
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
