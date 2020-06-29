import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #17181d;
  font-family: 'DroidSerif-Bold';
  margin: 10px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #17181d;
  font-size: 18px;
  font-family: 'DroidSerif';
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 6%;

  flex-direction: row;
  align-self: center;
`;

export const CreateAccountText = styled.Text`
  color: #17181d;
  font-size: 18px;
  font-family: 'DroidSerif';

  margin-left: 10px;
`;
