import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button } from './styles';

const AddRegistryButton: React.FC = () => {
  return (
    <Button underlayColor="#0E4B75" onPress={() => console.log('hello')}>
      <Icon name="ios-add" size={50} color="#fff" />
    </Button>
  );
};

export default AddRegistryButton;
