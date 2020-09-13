import React, { createContext, useContext, useCallback } from 'react';
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
    sequences: {
      [key: string]: number;
    };
    medals: {
      [key: string]: number;
    };
    insulinDaySequence: number;
    medicineDaySequence: {
      sequency: number;
      lastDay: string;
    };
    physicalActivityDaySequence: {
      sequency: number;
      lastDay: string;
    };
  };
  height: number;
  weight: number;
  imc: number;
}

export interface IRegistries {
  date: string;
  category: string;
  selfState: string;
  message: string;
  day: number;
  month: number;
  year: number;
  id: number;
}

interface IHandleCheckGameSequences {
  userToUpdate: IUser;
  category: string;
  selectedDate: string;
}

interface IGameContextData {
  insulinLogic(selectedDate: string): Promise<void>;
  medicineLogic(selectedDate: string): Promise<void>;
  imcLogic(updatedUser: IUser): Promise<void>;
  physicalActivityLogic(selectedDate: string): Promise<void>;
  handleCheckGameSequences(data: IHandleCheckGameSequences): Promise<void>;
}

const GameContext = createContext<IGameContextData>({} as IGameContextData);

const GameProvider: React.FC = ({ children }) => {
  const { user, onUpdateUser } = useAuth();
  const { getAlarmByRangeAndCategory } = useAlarm();

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
    const winLvl = (): boolean => {
      if (updatedUser.game.xp + newXp >= updatedUser.game.lvl * 100)
        return true;

      return false;
    };

    // true: quer dizer que o usuário upou de nível
    if (winLvl()) {
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
        winXp(15, updatedUser);
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
      const updatedUser = { ...user };
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
      const hasAlarmInSameTimeAsRegistry = getAlarmByRangeAndCategory({
        selectedDate,
        category: 'medicine',
      });
      const updatedUser = { ...user };

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
    [user, winXp, updateUser, getAlarmByRangeAndCategory, verifySequence],
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

      // imc estava abaixo do ideal e ele aumentou (até no máx a faixa ideal)
      if (user.imc < 18.5) {
        if (updatedUser.imc > user.imc && updatedUser.imc <= 24.9) {
          winXp(20, updatedUser);
        }
      }

      // imc estava acima do ideal e ele diminuiu (até no máx a faixa ideal)
      if (user.imc > 24.9) {
        if (updatedUser.imc < user.imc && updatedUser.imc >= 18.5) {
          winXp(20, updatedUser);
        }
      }

      await updateUser(updatedUser);
    },
    [user, updateUser, winXp],
  );

  const physicalActivityLogic = useCallback(
    async (selectedDate: string) => {
      const hasAlarmInSameTimeAsRegistry = getAlarmByRangeAndCategory({
        selectedDate,
        category: 'physical-activity',
      });
      const updatedUser = { ...user };

      if (hasAlarmInSameTimeAsRegistry) {
        if (!updatedUser.game.physicalActivityDaySequence.lastDay) {
          updatedUser.game.physicalActivityDaySequence.lastDay = selectedDate;

          updatedUser.game.physicalActivityDaySequence.sequency += 1;

          winXp(15, updatedUser);

          await updateUser(updatedUser);

          return;
        }

        const differenceBetweenRegistryDayAndLastMedicineRegister = differenceInDays(
          parseISO(selectedDate),
          parseISO(updatedUser.game.physicalActivityDaySequence.lastDay),
        );

        if (differenceBetweenRegistryDayAndLastMedicineRegister < 0) {
          winXp(10, updatedUser);

          updatedUser.game.physicalActivityDaySequence.lastDay = selectedDate;

          updatedUser.game.physicalActivityDaySequence.sequency = 1;

          await updateUser(updatedUser);
        } else if (differenceBetweenRegistryDayAndLastMedicineRegister === 1) {
          updatedUser.game.physicalActivityDaySequence.lastDay = selectedDate;

          verifySequence(
            updatedUser.game.physicalActivityDaySequence.sequency,
            updatedUser,
          );

          updatedUser.game.physicalActivityDaySequence.sequency += 1;

          winXp(10, updatedUser);

          await updateUser(updatedUser);
        } else if (differenceBetweenRegistryDayAndLastMedicineRegister >= 2) {
          winXp(10, updatedUser);

          updatedUser.game.physicalActivityDaySequence.lastDay = selectedDate;

          updatedUser.game.physicalActivityDaySequence.sequency = 1;

          await updateUser(updatedUser);
        }
      }
    },
    [getAlarmByRangeAndCategory, user, updateUser, verifySequence, winXp],
  );

  const verifyGameSequences = useCallback(
    ({ userToUpdate, category }: { userToUpdate: IUser; category: string }) => {
      if (
        userToUpdate.game.sequences[category] >= 1 &&
        !userToUpdate.game.medals[category]
      ) {
        userToUpdate.game.medals[category] += 1;
        Alert.alert('Parabéns!!', 'Você ganhou uma medalha :D.');
      }

      if (userToUpdate.game.sequences[category] === 30) {
        userToUpdate.game.medals[category] += 1;
        Alert.alert('Parabéns!!', 'Você ganhou uma medalha :D.');
      }

      if (userToUpdate.game.sequences[category] === 100) {
        userToUpdate.game.medals[category] += 1;
        Alert.alert('Parabéns!!', 'Você ganhou uma medalha :D.');
      }
    },
    [],
  );

  const handleCheckGameSequences = useCallback(
    async ({
      userToUpdate,
      selectedDate,
      category,
    }: IHandleCheckGameSequences) => {
      const yesterdayDate = subDays(parseISO(selectedDate), 1);

      const response = await api.get(
        `/registries?day=${yesterdayDate.getDate()}&month=${yesterdayDate.getMonth()}&year=${yesterdayDate.getFullYear()}&category=${category}`,
      );

      const hasYesterdayRegistry = response.data;

      if (hasYesterdayRegistry) {
        userToUpdate.game.sequences[category] += 1;

        verifyGameSequences({ userToUpdate, category });

        // aumenta a sequência daquela categoria
        await api.put(`/users/${userToUpdate.id}`, {
          userToUpdate,
        });

        await updateUser(userToUpdate);
      }
    },
    [updateUser, verifyGameSequences],
  );

  return (
    <GameContext.Provider
      value={{
        handleCheckGameSequences,
        medicineLogic,
        insulinLogic,
        imcLogic,
        physicalActivityLogic,
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
