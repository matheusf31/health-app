import React, { useState, useCallback, useMemo } from 'react';
import { DataTable } from 'react-native-paper';
import Emoji from 'react-native-emoji';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../../services/api';
import { useAuth } from '../../../hooks/auth';

import OpenDrawerButton from '../../../components/OpenDrawerButton';

import {
  Container,
  HeaderContainer,
  TitleView,
  Title,
  ImcRowText,
  ImcHeaderText,
  QuestionsContainer,
  QuestionContainer,
  QuestionText,
  InputContainer,
  QuestionInput,
  UnitText,
  ButtonContainer,
  SubmitButton,
} from './styles';

interface ImcRow {
  firstCellText: string;
  secondCellText: string;
  textColor: string;
  imcValue: boolean;
}

const ImcRow: React.FC<ImcRow> = ({
  firstCellText,
  secondCellText,
  textColor,
  imcValue,
}) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>
        <ImcRowText style={{ color: textColor, fontSize: 13 }}>
          {firstCellText}
        </ImcRowText>
      </DataTable.Cell>

      <DataTable.Cell style={{ right: -20 }}>
        <ImcRowText style={{ color: textColor }}>{secondCellText}</ImcRowText>
      </DataTable.Cell>

      <DataTable.Cell style={{ right: -60 }}>
        {imcValue && (
          <ImcRowText style={{ color: textColor }}>
            <Emoji name=":point_left:" style={{ fontSize: 20 }} />
          </ImcRowText>
        )}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

const Imc: React.FC = () => {
  const { user } = useAuth();

  const [loggedUser, setLoggedUser] = useState(user);
  const [weight, setWeight] = useState(loggedUser.weight); // peso
  const [height, setHeight] = useState(loggedUser.height); // altura

  const imc = useMemo(() => parseFloat((weight / height ** 2).toFixed(2)), [
    weight,
    height,
  ]);

  const handleUpdateUserImc = useCallback(async () => {
    const response = await api.put(`/users/${loggedUser.id}`, {
      ...loggedUser,
      height,
      weight,
      imc,
    });

    const updatedUser = response.data;

    await AsyncStorage.setItem('@HealthApp:user', JSON.stringify(updatedUser));

    setLoggedUser(updatedUser);
  }, [imc, loggedUser]);

  return (
    <Container
      contentContainerStyle={{ paddingBottom: 400 }}
      showsVerticalScrollIndicator={false}
    >
      <HeaderContainer>
        <OpenDrawerButton />

        <TitleView>
          <Title>Controle seu IMC</Title>
        </TitleView>
      </HeaderContainer>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <ImcHeaderText>Classificação</ImcHeaderText>
          </DataTable.Title>

          <DataTable.Title style={{ right: -20 }}>
            <ImcHeaderText>Valor do IMC</ImcHeaderText>
          </DataTable.Title>

          <DataTable.Title style={{ right: -30 }}>
            <ImcHeaderText>Seu IMC</ImcHeaderText>
          </DataTable.Title>
        </DataTable.Header>

        <ImcRow
          firstCellText="Baixo peso severo"
          secondCellText="< 16"
          textColor="#A30000"
          imcValue={imc < 16}
        />

        <ImcRow
          firstCellText="Baixo peso moderado"
          secondCellText="entre 16 e 16.9"
          textColor="#A36200"
          imcValue={imc >= 16 && imc <= 16.9}
        />

        <ImcRow
          firstCellText="Baixo peso leve"
          secondCellText="entre 17 e 18.49"
          textColor="#A3A100"
          imcValue={imc >= 17 && imc <= 18.49}
        />

        <ImcRow
          firstCellText="Peso ideal"
          secondCellText="entre 18.5 e 24.9"
          textColor="#04A300"
          imcValue={imc >= 18.5 && imc <= 24.9}
        />

        <ImcRow
          firstCellText="Sobrepeso"
          secondCellText="maior ou igual a 25"
          textColor="#A3A100"
          imcValue={imc === 25}
        />

        <ImcRow
          firstCellText="Pré-obesidade"
          secondCellText="entre 25 e 29.9"
          textColor="#A36200"
          imcValue={imc > 25 && imc <= 29.9}
        />

        <ImcRow
          firstCellText="Obesidade moderada"
          secondCellText="entre 30 e 34.9"
          textColor="#A33500"
          imcValue={imc >= 30 && imc <= 34.9}
        />

        <ImcRow
          firstCellText="Obesidade alta"
          secondCellText="entre 35 e 39.9"
          textColor="#A32400"
          imcValue={imc >= 35 && imc <= 39.9}
        />

        <ImcRow
          firstCellText="Obesidade muito alta"
          secondCellText=">= 40"
          textColor="#A30000"
          imcValue={imc >= 40}
        />
      </DataTable>

      <QuestionsContainer>
        <QuestionContainer>
          <QuestionText>Atualize seu peso</QuestionText>

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
          <QuestionText>Atualize sua altura</QuestionText>

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

        <ButtonContainer>
          <SubmitButton onPress={handleUpdateUserImc}>Enviar</SubmitButton>
        </ButtonContainer>
      </QuestionsContainer>
    </Container>
  );
};

export default Imc;
