import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { DrawerButton } from './styles';

const OpenDrawerButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <DrawerButton
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Icon name="ios-menu" size={25} color="#146ba8" />
    </DrawerButton>
  );
};

export default OpenDrawerButton;
