import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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

const FirstQuestion: React.FC = () => {
  const [firstQuestion, setFirstQuestion] = useState<boolean | undefined>(
    undefined,
  );

  const navigation = useNavigation();

  const handleSubmit = useCallback(
    (answer: boolean) => {
      setFirstQuestion(answer);

      navigation.navigate('SecondQuestion', {
        firstQuestion: answer,
      });
    },
    [navigation],
  );

  return (
    <Container>
      <DoctorsImage source={medicineImg} />

      <QuestionContainer>
        <QuestionText>Você aplica insulina?</QuestionText>
      </QuestionContainer>

      <ButtonContainer>
        <Button
          active={firstQuestion === false}
          onPress={() => handleSubmit(false)}
        >
          <ButtonText active={firstQuestion === false}>Não</ButtonText>
        </Button>
        <Button
          active={firstQuestion === true}
          onPress={() => handleSubmit(true)}
        >
          <ButtonText active={firstQuestion === true}>Sim</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default FirstQuestion;
