import React, { useCallback } from 'react';

import { useAuth } from '../../../hooks/auth';

import Trophy from '../../../assets/medals/trophy.svg';
import First from '../../../assets/medals/first-prize.svg';
import Second from '../../../assets/medals/second-prize.svg';
import Third from '../../../assets/medals/third-prize.svg';
import TrophyColor from '../../../assets/medals/trophy-color.svg';
import FirstColor from '../../../assets/medals/first-prize-color.svg';
import SecondColor from '../../../assets/medals/second-prize-color.svg';
import ThirdColor from '../../../assets/medals/third-prize-color.svg';

import Header from '../components/Header';

import { Container, MedalContainer, MedalTitle, MedalsView } from './styles';

const Medals: React.FC = () => {
  const { user } = useAuth();

  const verifyAllSequence = useCallback(() => {
    if (
      user.game.medals['physical-activity'] === 3 &&
      user.game.medals['blood-glucose'] === 3 &&
      user.game.medals['insulin-therapy'] === 3 &&
      user.game.medals['medicine'] === 3
    )
      return true;

    return false;
  }, [user.game.medals]);

  return (
    <Container contentContainerStyle={{ paddingBottom: 200 }}>
      <Header title="Suas medalhas" />

      <MedalContainer>
        <MedalTitle>O grande troféu</MedalTitle>

        <MedalsView>
          {verifyAllSequence() ? (
            <TrophyColor width={100} height={70} />
          ) : (
            <Trophy width={100} height={70} />
          )}
        </MedalsView>

        <MedalTitle>Medalhas para atividade física</MedalTitle>

        <MedalsView>
          {user.game.medals['physical-activity'] >= 1 ? (
            <ThirdColor width={100} height={70} />
          ) : (
            <Third width={100} height={70} />
          )}

          {user.game.medals['physical-activity'] >= 2 ? (
            <SecondColor width={100} height={70} />
          ) : (
            <Second width={100} height={70} />
          )}

          {user.game.medals['physical-activity'] === 3 ? (
            <FirstColor width={100} height={70} />
          ) : (
            <First width={100} height={70} />
          )}
        </MedalsView>

        <MedalTitle>Medalhas para glicemia</MedalTitle>

        <MedalsView>
          {user.game.medals['blood-glucose'] >= 1 ? (
            <ThirdColor width={100} height={70} />
          ) : (
            <Third width={100} height={70} />
          )}

          {user.game.medals['blood-glucose'] >= 2 ? (
            <SecondColor width={100} height={70} />
          ) : (
            <Second width={100} height={70} />
          )}

          {user.game.medals['blood-glucose'] === 3 ? (
            <FirstColor width={100} height={70} />
          ) : (
            <First width={100} height={70} />
          )}
        </MedalsView>

        <MedalTitle>Medalhas para insulina</MedalTitle>

        <MedalsView>
          {user.game.medals['insulin-therapy'] >= 1 ? (
            <ThirdColor width={100} height={70} />
          ) : (
            <Third width={100} height={70} />
          )}

          {user.game.medals['insulin-therapy'] >= 2 ? (
            <SecondColor width={100} height={70} />
          ) : (
            <Second width={100} height={70} />
          )}

          {user.game.medals['insulin-therapy'] === 3 ? (
            <FirstColor width={100} height={70} />
          ) : (
            <First width={100} height={70} />
          )}
        </MedalsView>

        <MedalTitle>Medalhas para medicamentos</MedalTitle>

        <MedalsView>
          {user.game.medals['medicine'] >= 1 ? (
            <ThirdColor width={100} height={70} />
          ) : (
            <Third width={100} height={70} />
          )}

          {user.game.medals['medicine'] >= 2 ? (
            <SecondColor width={100} height={70} />
          ) : (
            <Second width={100} height={70} />
          )}

          {user.game.medals['medicine'] === 3 ? (
            <FirstColor width={100} height={70} />
          ) : (
            <First width={100} height={70} />
          )}
        </MedalsView>
      </MedalContainer>
    </Container>
  );
};

export default Medals;
