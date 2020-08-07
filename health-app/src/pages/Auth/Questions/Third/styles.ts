import styled from 'styled-components/native';

import Button from '../../../../components/Button';

export const Container = styled.View`
  align-items: center;
  justify-content: center;

  margin: 0 24px;
  height: 80%;
`;

export const DoctorsImage = styled.Image`
  opacity: 0.3;
`;

export const QuestionsContainer = styled.View`
  margin: 40px 28px 20px;
`;

export const QuestionContainer = styled.View`
  flex-direction: row;

  justify-content: space-between;

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
  font-family: 'Roboto-Regular';
`;

export const SubmitButton = styled(Button)`
  padding: 0 60px;
  margin-right: 5px;
  height: 50px;
`;
