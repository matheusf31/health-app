import React from 'react';

import { useAuth } from '../../../hooks/auth';

import TrophyColor from '../../../assets/medals/trophy-color.svg';
import FirstColor from '../../../assets/medals/first-prize-color.svg';
import SecondColor from '../../../assets/medals/second-prize-color.svg';
import ThirdColor from '../../../assets/medals/third-prize-color.svg';

import Header from '../components/Header';

import {
  Container,
  Title,
  DescriptionContainer,
  MedalImageView,
  MedalTextView,
  MedalText,
  XpAmountView,
  XpAmountText,
  XpTextView,
  XpText,
  Separator,
} from './styles';

const MedalComponent: React.FC = () => (
  <>
    <Title>Para ganhar medalhas</Title>

    <DescriptionContainer>
      <MedalImageView>
        <ThirdColor width={70} height={70} />
      </MedalImageView>

      <MedalTextView>
        <MedalText>Faça um registro em qualquer categoria</MedalText>
      </MedalTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <MedalImageView>
        <SecondColor width={70} height={70} />
      </MedalImageView>

      <MedalTextView>
        <MedalText>Faça 30 registros em qualquer categoria</MedalText>
      </MedalTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <MedalImageView>
        <FirstColor width={70} height={70} />
      </MedalImageView>

      <MedalTextView>
        <MedalText>Faça 100 registros em qualquer categoria</MedalText>
      </MedalTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <MedalImageView>
        <TrophyColor width={70} height={70} />
      </MedalImageView>

      <MedalTextView>
        <MedalText>Libere a medalha de ouro em todas as categorias</MedalText>
      </MedalTextView>
    </DescriptionContainer>
  </>
);

const XpComponent: React.FC = () => (
  <>
    <Title style={{ marginTop: 28 }}>Para ganhar xp</Title>

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+5 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>
          Registre sua insulina todos os dias (conta apenas uma vez)
        </XpText>
      </XpTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+15 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>
          Registre sua insulina todos os dias 7 vezes seguidas (conta apenas uma
          vez)
        </XpText>
      </XpTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+25 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>
          Registre sua insulina todos os dias 30 vezes seguidas (conta apenas
          uma vez)
        </XpText>
      </XpTextView>
    </DescriptionContainer>

    <Separator />

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+5 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>Tomar seus medicamentos seguindo o alarme todos os dias</XpText>
      </XpTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+15 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>
          Tomar seus medicamentos seguindo o alarme 7 vezes seguidas
        </XpText>
      </XpTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+25 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>
          Tomar seus medicamentos seguindo o alarme 30 vezes seguidas
        </XpText>
      </XpTextView>
    </DescriptionContainer>

    <Separator />

    {/* PARA TODOS */}
    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+10 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>Faça atividade física seguindo seus alarmes</XpText>
      </XpTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+15 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>
          Faça atividade física seguindo seus alarmes 7 vezes seguidas
        </XpText>
      </XpTextView>
    </DescriptionContainer>

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+25 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>
          Faça atividade física seguindo seus alarmes 30 vezes seguidas
        </XpText>
      </XpTextView>
    </DescriptionContainer>

    <Separator />

    <DescriptionContainer>
      <XpAmountView>
        <XpAmountText>+20 xp</XpAmountText>
      </XpAmountView>

      <XpTextView>
        <XpText>Melhore seu IMC</XpText>
      </XpTextView>
    </DescriptionContainer>
  </>
);

const Goals: React.FC = () => {
  return (
    <Container contentContainerStyle={{ paddingBottom: 200 }}>
      <Header title="Metas" />

      <MedalComponent />

      <XpComponent />
    </Container>
  );
};

export default Goals;
