import styled from 'styled-components/native';

import Button from '../../../components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  background: #ebf1f3;

  margin: 0 24px;
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

export const QuestionContainer = styled.View`
  flex-direction: row;

  margin-bottom: 10px;
`;

export const QuestionText = styled.Text`
  font-size: 25px;
  font-family: 'Roboto-Medium';

  align-self: flex-end;
`;

export const InputContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #146ba8;

  flex-direction: row;
  align-items: center;

  margin-left: 20px;

  width: 70px;
`;

export const QuestionInput = styled.TextInput`
  flex: 1;
  padding: 0 6px;
`;

export const UnitText = styled.Text``;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const SubmitButton = styled(Button)`
  padding: 0 60px;
  margin: 10px 0px;
  height: 40px;
  flex: 1;
`;
