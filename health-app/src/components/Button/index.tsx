import React from 'react';
import { TouchableOpacityProperties } from 'react-native';

import { Container, ButtonText } from './styles';

interface IButtonProps extends TouchableOpacityProperties {
  children: string;
}

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <Container activeOpacity={0.8} {...rest}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
