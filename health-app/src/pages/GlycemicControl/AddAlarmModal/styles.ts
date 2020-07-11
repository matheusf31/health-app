import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Button from '../../../components/Button';

export const Container = styled.View``;

export const ModalContainer = styled.View`
  width: 100%;
  height: ${Dimensions.get('screen').height / 2.6}px;
  background: #fbfbfb;
  border-radius: 10px;

  padding: 0 24px;
`;

export const ModalTitleContainer = styled.View`
  /* flex-direction: row;

  align-items: center; */
  margin-top: 20px;
`;

export const ModalTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 24px;
`;

export const ModalCreateAlarmButton = styled(Button)``;

export const ModalCreateAlarmButtonText = styled.Text``;
