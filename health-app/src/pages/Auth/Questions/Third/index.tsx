import React, { useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';

import { useAuth } from '../../../../hooks/auth';
import { useGame } from '../../../../hooks/game';

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

/**
 * To Do
 *
 * [ ] colocar refs nos inputs
 */

const ThirdQuestion: React.FC = () => {
  const { user, onUpdateUser } = useAuth();
  const { imcLogic } = useGame();
  const [weight, setWeight] = useState(0); // peso
  const [height, setHeight] = useState(0); // altura

  const route = useRoute();
  const routeParams = route.params as IRoute;

  const handleSubmit = useCallback(async () => {
    const { firstQuestion, secondQuestion } = routeParams;

    const imc = parseFloat((weight / height ** 2).toFixed(2));

    const goals = {} as { [key: string]: boolean };

    goals['aplicar insulina'] = firstQuestion;

    goals['tomar os medicamentos seguindo os alarmes'] = secondQuestion;

    const updatedUser = {
      ...user,
      height,
      weight,
      imc,
      goals,
    };

    await imcLogic(updatedUser);

    onUpdateUser(updatedUser);
  }, [weight, height, routeParams, onUpdateUser, imcLogic, user]);

  return (
    <Container>
      <DoctorsImage source={medicineImg} />

      <QuestionsContainer>
        <QuestionContainer>
          <QuestionText>Qual é o seu peso?</QuestionText>

          <InputContainer>
            <QuestionInput
              keyboardType="numeric"
              placeholderTextColor="#89828E"
              defaultValue={weight.toString()}
              onChangeText={value => {
                setWeight(Number(value));
              }}
            />

            <UnitText>kg</UnitText>
          </InputContainer>
        </QuestionContainer>

        <QuestionContainer>
          <QuestionText>Qual é a sua altura?</QuestionText>

          <InputContainer>
            <QuestionInput
              keyboardType="numeric"
              placeholderTextColor="#89828E"
              defaultValue={height.toString()}
              onChangeText={value => {
                setHeight(Number(value));
              }}
            />

            <UnitText>m</UnitText>
          </InputContainer>
        </QuestionContainer>
      </QuestionsContainer>

      <ButtonContainer>
        <SubmitButton onPress={handleSubmit}>Enviar</SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default ThirdQuestion;
