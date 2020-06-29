import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, StatusBar } from 'react-native';

import Routes from './routes';

// import { Container } from './styles';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar backgroundColor="#EBFDFF" />
    <View style={{ flex: 1, backgroundColor: '#EBFDFF' }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
