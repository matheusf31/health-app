import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import AppProvider from './hooks/index';

import Routes from './routes';

import { store } from './store';

const App: React.FC = () => (
  <NavigationContainer>
    <ReduxProvider store={store}>
      <PaperProvider>
        <StatusBar backgroundColor="#EBF1F3" barStyle="dark-content" />

        <AppProvider>
          <Routes />
        </AppProvider>
      </PaperProvider>
    </ReduxProvider>
  </NavigationContainer>
);

export default App;
