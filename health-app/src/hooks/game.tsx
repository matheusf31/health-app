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

interface IImcLogicParams {
  weight: number;
  height: number;
  newImc: number;
}

// talvez eu não precise do usuário logado no meu contexto
interface IGameContextData {
  insulinLogic(selectedDate: string): Promise<void>;
  medicineLogic(selectedDate: string): Promise<void>;
  imcLogic(updatedUser: IUser): Promise<void>;
}

const GameContext = createContext<IGameContextData>({} as IGameContextData);

/**
 * Lógica do jogo
 */
const GameProvider: React.FC = ({ children }) => {
  const { user, onUpdateUser } = useAuth();
  const { getAlarmByRange } = useAlarm();

  const updateUser = useCallback(
    async (userToUpdate: IUser) => {
      const response = await api.put<IUser>(`users/${userToUpdate.id}`, {
        ...userToUpdate,
      });

      await AsyncStorage.setItem(
        '@HealthApp:user',
        JSON.stringify(response.data),
      );

      onUpdateUser(userToUpdate);
    },
    [onUpdateUser],
  );

  const winXp = useCallback((newXp: number, updatedUser: IUser) => {
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
    (sequence: number, updatedUser: IUser) => {
      if (sequence % 7 === 0) {
        winXp(10, updatedUser);
      }

      if (sequence % 30 === 0) {
        winXp(25, updatedUser);
      }

      return false;
    },
    [winXp],
  );

  const insulinLogic = useCallback(
    async (selectedDate: string) => {
      const updatedUser = user;
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

      winXp(5, updatedUser);

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
    [user, winXp, updateUser, verifySequence],
  );

  const medicineLogic = useCallback(
    async (selectedDate: string) => {
      const hasAlarmInSameTimeAsRegistry = getAlarmByRange(selectedDate);
      const updatedUser = user;

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
    [user, winXp, updateUser, getAlarmByRange, verifySequence],
  );

  const imcLogic = useCallback(
    async (updatedUser: IUser) => {
      if (
        updatedUser.firstLogin &&
        updatedUser.imc >= 18.5 &&
        updatedUser.imc <= 24.9
      ) {
        winXp(5, updatedUser);

        updatedUser.firstLogin = false;

        await updateUser(updatedUser);

        return;
      }

      // imc estava abaixo do ideal e ele aumentou no máx até a faixa ideal
      if (user.imc < 18.5) {
        if (updatedUser.imc > user.imc && updatedUser.imc <= 24.9) {
          winXp(10, updatedUser);
        }
      }

      // imc estava acima do ideal e ele diminuiu no máx até a faixa ideal
      if (user.imc > 24.9) {
        if (updatedUser.imc < user.imc && updatedUser.imc >= 18.5) {
          winXp(10, updatedUser);
        }
      }

      await updateUser(updatedUser);
    },
    [user, updateUser, winXp],
  );

  return (
    <GameContext.Provider
      value={{
        medicineLogic,
        insulinLogic,
        imcLogic,
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
