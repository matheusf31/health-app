import styled, { css } from 'styled-components/native';

interface IButton {
  active: boolean;
}

interface IButtonText {
  active: boolean;
}

export const Container = styled.View`
  align-items: center;
  justify-content: center;

  margin: 0 24px;
  height: 80%;
`;

export const DoctorsImage = styled.Image`
  opacity: 0.3;
`;

export const QuestionContainer = styled.View`
  margin: 40px 28px 20px;
`;

export const QuestionText = styled.Text`
  font-size: 25px;
  font-family: 'Roboto-Medium';
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity<IButton>`
  height: 55px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #146ba8;

  margin-top: 10px;
  justify-content: center;
  align-items: center;

  padding: 0 60px;
  margin-right: 5px;
  height: 50px;

  ${props =>
    props.active &&
    css`
      background: #146ba8;
    `};
`;

export const ButtonText = styled.Text<IButtonText>`
  font-family: 'Roboto-Medium';
  color: #000;
  font-size: 16px;

  ${props =>
    props.active &&
    css`
      color: #f4f4f4;
    `};
`;
