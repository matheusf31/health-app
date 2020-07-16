import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  width: 100%;
  background: #ebf1f3;
  border-radius: 10px;

  padding: 20px 0;
`;

export const ModalTitleContainer = styled.View``;

export const ModalTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 24px;

  padding: 0 24px;
`;

export const ModalAlarmMessageContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 40px;
  padding: 0 24px;
  justify-content: space-around;
`;

export const ModalAlarmMessageTextContainer = styled.View`
  width: 250px;
`;

export const ModalAlarmMessageText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto';
`;

export const ModalAlarmMessageButton = styled.TouchableOpacity`
  margin-left: 20px;
`;
