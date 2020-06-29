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
  margin-top: 10px;

  margin-bottom: 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  margin: 20px 0 0;

  flex-direction: row;

  align-items: center;
`;

export const BackToSignInText = styled.Text`
  color: #17181d;
  font-size: 18px;
  font-family: 'DroidSerif';

  margin-left: 10px;
`;
