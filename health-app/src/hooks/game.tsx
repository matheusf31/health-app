import React, { createContext, useContext, useCallback } from 'react';

import api from '../services/api';

import { useAuth } from './auth';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  firstLogin: boolean;
  goals: string[];
  game: {
    lvl: number;
    xp: number;
  };
}

// talvez eu não precise do usuário logado no meu contexto
interface IGameContextData {
  loggedUser: IUser;
  hasInsulinGoal(): void;
}

const GameContext = createContext<IGameContextData>({} as IGameContextData);

const GameProvider: React.FC = ({ children }) => {
  const { user: loggedUser } = useAuth();

  // criar função que dá os pontos ao usuário
  const winXp = useCallback(() => {
    /* TO DO
     * 1° verificar o lvl e decidir quanto ela vai ganhar
     * (lvl 1 -> ganha 100xp // lvl 2 -> ganha 50xp // lvl 3 -> ganha 33.3px // lvl 4 -> ganha 25pxp)
     * 2° verificar o xp da pessoa e ver se ela vai upar
     */
  }, []);

  const hasInsulinGoal = useCallback(() => {
    if (loggedUser.goals.includes('aplicar insulina')) {
      winXp();
    }
  }, [loggedUser.goals, winXp]);

  return (
    <GameContext.Provider
      value={{
        loggedUser,
        hasInsulinGoal,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

function useGame(): IGameContextData {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('Usuário não está autenticado.');
  }

  return context;
}

export { GameProvider, useGame };
