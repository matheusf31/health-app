import styled from 'styled-components/native';

export const Container = styled.View`
  background: #ffffff;
  margin: 5px 0;
  padding: 10px;

  border-radius: 10px;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const TimeContainer = styled.View`
  margin: 0 10px;
`;

export const TimeText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  color: #17181d;
`;

export const MessageContainer = styled.TouchableOpacity`
  width: 300px;

  /* flex: 1;
  align-items: center;
  margin: 0 20px; */
`;

export const MessageText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: #17181d;
`;

export const CancelButtonContainer = styled.TouchableOpacity``;

/** Modal */
export const ModalContainer = styled.View`
  width: 100%;
  height: 60%;
  background: #fbfbfb;
  border-radius: 10px;

  padding: 0 24px;
`;

export const ModalTitleContainer = styled.View`
  flex-direction: row;

  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ModalTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 24px;

  margin-left: 10px;
`;
