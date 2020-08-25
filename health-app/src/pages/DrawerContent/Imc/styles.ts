import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #ebf1f3;

  padding: 0 24px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 20px;
`;

export const TitleView = styled.View`
  margin: 10px auto;
  height: 46px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'Roboto-Medium';
  color: #146ba8;
`;

export const ImcHeaderText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  font-weight: bold;

  color: #17181d;
`;

export const ImcRowText = styled.Text`
  font-family: 'Roboto-Regular';
  font-weight: bold;
`;

export const QuestionsContainer = styled.View`
  margin: 20px 0px 10px;
`;
