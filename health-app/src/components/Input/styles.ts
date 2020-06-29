import styled, { css } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  height: 55px;
  padding: 0 16px;
  margin-bottom: 10px;

  background: #f4f4f4;

  border-radius: 10px;
  border-width: 2px;
  border-color: #f4f4f4;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #146ba8;
    `}
`;

export const IconContainer = styled.View`
  width: 30px;
`;

export const Icon = styled(Ionicons)``;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #17181d;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;
