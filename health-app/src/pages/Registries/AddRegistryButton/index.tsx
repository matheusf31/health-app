import React from 'react';
import { TouchableHighlightProperties } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button } from './styles';

const AddRegistryButton: React.FC<TouchableHighlightProperties> = ({
  ...rest
}) => {
  return (
    <Button underlayColor="#0E4B75" {...rest}>
      <Icon name="ios-add" size={50} color="#fff" />
    </Button>
  );
};

export default AddRegistryButton;
