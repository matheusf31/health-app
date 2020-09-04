import styled from 'styled-components/native';

export const Container = styled.View`
  background: #ffffff;
  margin: 5px 0;
  padding: 10px;

  border-radius: 10px;
  flex-direction: row;

  align-items: center;
`;

export const TimeContainer = styled.View`
  margin: 0 10px;
`;

export const TimeText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 16px;
  color: #17181d;
`;

export const MessageContainer = styled.TouchableOpacity`
  flex: 5;
  padding: 10px;
`;

export const MessageText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 16px;
  color: #17181d;
`;

export const DeleteButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  flex: 1;
`;
