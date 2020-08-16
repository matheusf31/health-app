import React from 'react';
import { View, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

const DrawerContent: React.FC<DrawerContentComponentProps> = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>Drawer Content</Text>
      <DrawerItem onPress={() => console.log('teste')} label="teste" />
    </View>
  );
};

export default DrawerContent;
