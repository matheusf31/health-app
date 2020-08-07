import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import medicineImg from '../../../../assets/medicine.png';

import {
  Container,
  DoctorsImage,
  QuestionContainer,
  QuestionText,
  ButtonContainer,
  Button,
  ButtonText,
} from './styles';

interface IRoute {
  firstQuestion: boolean;
}

const SecondQuestion: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as IRoute;

  const [secondQuestion, setSecondQuestion] = useState<boolean | undefined>(
    undefined,
  );

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    (answer: boolean) => {
      setSecondQuestion(answer);

      navigation.navigate('ThirdQuestion', {
        firstQuestion: routeParams.firstQuestion,
        secondQuestion: answer,
      });
    },
    [navigation, routeParams],
  );

  return (
    <Container>
      <DoctorsImage source={medicineImg} />

      <QuestionContainer>
        <QuestionText>
          Você toma algum medicamento para controlar sua glicemia?
        </QuestionText>
      </QuestionContainer>

      <ButtonContainer>
        <Button
          active={secondQuestion === false}
          onPress={() => handleSubmit(false)}
        >
          <ButtonText active={secondQuestion === false}>Não</ButtonText>
        </Button>
        <Button
          active={secondQuestion === true}
          onPress={() => handleSubmit(true)}
        >
          <ButtonText active={secondQuestion === true}>Sim</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default SecondQuestion;
