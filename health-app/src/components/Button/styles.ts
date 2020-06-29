import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 55px;
  background: #146ba8;
  border-radius: 10px;

  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'DroidSerif-Bold';
  color: #f4f4f4;
  font-size: 16px;
`;
