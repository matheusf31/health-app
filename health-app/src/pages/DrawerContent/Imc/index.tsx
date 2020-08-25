import React from 'react';
import { DataTable } from 'react-native-paper';
import Emoji from 'react-native-emoji';

import { useAuth } from '../../../hooks/auth';

import OpenDrawerButton from '../../../components/OpenDrawerButton';

import {
  Container,
  HeaderContainer,
  TitleView,
  Title,
  ImcRowText,
  ImcHeaderText,
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
          imcValue={user.imc < 16}
        />

        <ImcRow
          firstCellText="Baixo peso moderado"
          secondCellText="entre 16 e 16.9"
          textColor="#A36200"
          imcValue={user.imc >= 16 && user.imc <= 16.9}
        />

        <ImcRow
          firstCellText="Baixo peso leve"
          secondCellText="entre 17 e 18.49"
          textColor="#A3A100"
          imcValue={user.imc >= 17 && user.imc <= 18.49}
        />

        <ImcRow
          firstCellText="Peso ideal"
          secondCellText="entre 18.5 e 24.9"
          textColor="#04A300"
          imcValue={user.imc >= 18.5 && user.imc <= 24.9}
        />

        <ImcRow
          firstCellText="Sobrepeso"
          secondCellText="maior ou igual a 25"
          textColor="#A3A100"
          imcValue={user.imc === 25}
        />

        <ImcRow
          firstCellText="Pré-obesidade"
          secondCellText="entre 25 e 29.9"
          textColor="#A36200"
          imcValue={user.imc > 25 && user.imc <= 29.9}
        />

        <ImcRow
          firstCellText="Obesidade moderada"
          secondCellText="entre 30 e 34.9"
          textColor="#A33500"
          imcValue={user.imc >= 30 && user.imc <= 34.9}
        />

        <ImcRow
          firstCellText="Obesidade alta"
          secondCellText="entre 35 e 39.9"
          textColor="#A32400"
          imcValue={user.imc >= 35 && user.imc <= 39.9}
        />

        <ImcRow
          firstCellText="Obesidade muito alta"
          secondCellText=">= 40"
          textColor="#A30000"
          imcValue={user.imc >= 40}
        />
      </DataTable>
    </Container>
  );
};

export default Imc;
