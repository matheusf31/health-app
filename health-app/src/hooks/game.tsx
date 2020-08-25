import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import { subDays, differenceInDays, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

import { useAuth } from './auth';
import { useAlarm } from './alarm';

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  firstLogin: boolean;
  goals: {
    [key: string]: boolean;
  };
  game: {
    lvl: number;
    xp: number;
    insulinDaySequence: number;
    medicineDaySequence: {
      sequency: number;
      lastDay: string;
    };
  };
  height: number;
  weight: number;
  imc: number;
}

interface IRegistries {
  date: string;
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
  insulinLogic(selectedDate: string): Promise<void>;
  medicineLogic(selectedDate: string): Promise<void>;
}

const GameContext = createContext<IGameContextData>({} as IGameContextData);

/**
 * Lógica do jogo
 */
const GameProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { getAlarmByRange } = useAlarm();

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

  const verifySequence = useCallback(
    async (sequence: number, updatedUser: IUser) => {
      if (sequence % 7 === 0) {
        await winXp(10, updatedUser);
      }

      if (sequence % 30 === 0) {
        await winXp(25, updatedUser);
      }

      return false;
    },
    [winXp],
  );

  const insulinLogic = useCallback(
    async (selectedDate: string) => {
      const updatedUser = loggedUser;
      const parsedSelectedDate = parseISO(selectedDate);
      const searchDate = subDays(parsedSelectedDate, 1);

      // chegando se existe registro no dia selecionado
      let response = await api.get<IRegistries[]>(
        `/registries?day=${parsedSelectedDate.getDate()}&month=${parsedSelectedDate.getMonth()}&year=${parsedSelectedDate.getFullYear()}&category=insulin-therapy`,
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
        verifySequence(updatedUser.game.insulinDaySequence, updatedUser);

        updatedUser.game.insulinDaySequence += 1;

        await updateUser(updatedUser);
      } else {
        updatedUser.game.insulinDaySequence = 1;

        await updateUser(updatedUser);
      }
    },
    [loggedUser, winXp, updateUser, verifySequence],
  );

  const medicineLogic = useCallback(
    async (selectedDate: string) => {
      const hasAlarmInSameTimeAsRegistry = getAlarmByRange(selectedDate);
      const updatedUser = loggedUser;

      if (hasAlarmInSameTimeAsRegistry) {
        if (!updatedUser.game.medicineDaySequence.lastDay) {
          updatedUser.game.medicineDaySequence.lastDay = selectedDate;

          updatedUser.game.medicineDaySequence.sequency += 1;

          winXp(5, updatedUser);

          await updateUser(updatedUser);

          return;
        }

        const differenceBetweenRegistryDayAndLastMedicineRegister = differenceInDays(
          parseISO(selectedDate),
          parseISO(updatedUser.game.medicineDaySequence.lastDay),
        );

        if (differenceBetweenRegistryDayAndLastMedicineRegister < 0) {
          winXp(5, updatedUser);

          updatedUser.game.medicineDaySequence.lastDay = selectedDate;

          updatedUser.game.medicineDaySequence.sequency = 1;

          await updateUser(updatedUser);
        } else if (differenceBetweenRegistryDayAndLastMedicineRegister === 1) {
          updatedUser.game.medicineDaySequence.lastDay = selectedDate;

          verifySequence(
            updatedUser.game.medicineDaySequence.sequency,
            updatedUser,
          );

          updatedUser.game.medicineDaySequence.sequency += 1;

          winXp(5, updatedUser);

          await updateUser(updatedUser);
        } else if (differenceBetweenRegistryDayAndLastMedicineRegister >= 2) {
          updatedUser.game.medicineDaySequence.lastDay = selectedDate;

          updatedUser.game.medicineDaySequence.sequency = 1;

          await updateUser(updatedUser);
        }
      }
    },
    [loggedUser, winXp, updateUser, getAlarmByRange, verifySequence],
  );

  return (
    <GameContext.Provider
      value={{
        loggedUser,
        medicineLogic,
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
