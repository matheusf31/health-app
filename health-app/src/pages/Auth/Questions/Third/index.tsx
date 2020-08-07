import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { useAuth } from '../../../../hooks/auth';

import medicineImg from '../../../../assets/medicine.png';

import {
  Container,
  DoctorsImage,
  QuestionsContainer,
  QuestionContainer,
  QuestionText,
  InputContainer,
  QuestionInput,
  UnitText,
  ButtonContainer,
  SubmitButton,
} from './styles';

interface IRoute {
  firstQuestion: boolean;
  secondQuestion: boolean;
}

const ThirdQuestion: React.FC = () => {
  const { updateFirstLogin } = useAuth();

  const route = useRoute();
  const routeParams = route.params as IRoute;

  return (
    <Container>
      <DoctorsImage source={medicineImg} />
      <QuestionsContainer>
        <QuestionContainer>
          <QuestionText>Qual é o seu peso?</QuestionText>

          <InputContainer>
            <QuestionInput keyboardType="numeric" />

            <UnitText>kg</UnitText>
          </InputContainer>
        </QuestionContainer>

        <QuestionContainer>
          <QuestionText>Qual é a sua altura?</QuestionText>

          <InputContainer>
            <QuestionInput keyboardType="numeric" />

            <UnitText>cm</UnitText>
          </InputContainer>
        </QuestionContainer>
      </QuestionsContainer>

      <ButtonContainer>
        <SubmitButton onPress={updateFirstLogin}>Enviar</SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default ThirdQuestion;
