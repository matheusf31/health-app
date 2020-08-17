import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import { subDays } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

import { useAuth } from './auth';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  firstLogin: boolean;
  goals: string[];
  game: {
    lvl: number;
    xp: number;
    daySequence: number;
  };
}

interface IRegistries {
  date: Date;
  category: string;
  selfState: string;
  message: string;
  day: number;
  month: number;
  year: number;
  id: number;
}

// talvez eu não precise do usuário logado no meu contexto
interface IGameContextData {
  loggedUser: IUser;
  insulinLogic(selectedDate: Date): Promise<void>;
}

const GameContext = createContext<IGameContextData>({} as IGameContextData);

/**
 * Lógica do jogo
 */
const GameProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [loggedUser, setLoggedUser] = useState(user);

  useEffect(() => {
    setLoggedUser(user);
  }, [user]);

  const updateUser = useCallback(async (userToUpdate: IUser) => {
    const response = await api.put<IUser>(`users/${userToUpdate.id}`, {
      ...userToUpdate,
    });

    await AsyncStorage.setItem(
      '@HealthApp:user',
      JSON.stringify(response.data),
    );

    setLoggedUser(userToUpdate);
  }, []);

  const winXp = useCallback(async (newXp: number, updatedUser: IUser) => {
    // true: quer dizer que o usuário upou de nível
    if (updatedUser.game.xp + newXp >= updatedUser.game.lvl * 100) {
      updatedUser.game.xp =
        updatedUser.game.xp + newXp - updatedUser.game.lvl * 100;

      updatedUser.game.lvl += updatedUser.game.lvl;

      return;
    }

    updatedUser.game.xp += newXp;

    Alert.alert('Parabéns!', `Você ganhou ${newXp} xp`);
  }, []);

  const insulinLogic = useCallback(
    async (selectedDate: Date) => {
      const updatedUser = loggedUser;

      if (loggedUser.goals.includes('aplicar insulina')) {
        const searchDate = subDays(selectedDate, 1);

        // chegando se existe registro no dia selecionado
        let response = await api.get<IRegistries[]>(
          `/registries?day=${selectedDate.getDate()}&month=${selectedDate.getMonth()}&year=${selectedDate.getFullYear()}&category=insulin-therapy`,
        );

        const hasTodayRegistry = response.data;

        if (hasTodayRegistry.length > 0) {
          return;
        }

        await winXp(5, updatedUser);

        // checando se existe registro 1 dia antes do dia selecionado
        response = await api.get<IRegistries[]>(
          `/registries?day=${searchDate.getDate()}&month=${searchDate.getMonth()}&year=${searchDate.getFullYear()}&category=insulin-therapy`,
        );

        const hasOldRegistry = response.data;

        if (hasOldRegistry.length > 0) {
          // marcou 7 dias seguidos (10 xp)
          if (updatedUser.game.daySequence % 7 === 0) {
            await winXp(10, updatedUser);
          }

          // marcou 30 dias seguidos (25 xp)
          if (updatedUser.game.daySequence % 30 === 0) {
            await winXp(25, updatedUser);
          }

          updatedUser.game.daySequence += 1;

          await updateUser(updatedUser);
        } else {
          updatedUser.game.daySequence = 1;

          await updateUser(updatedUser);
        }
      }
    },
    [loggedUser, winXp, updateUser],
  );

  return (
    <GameContext.Provider
      value={{
        loggedUser,
        insulinLogic,
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
