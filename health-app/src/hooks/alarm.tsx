import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import { isSameDay, parseISO, differenceInMinutes } from 'date-fns';
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

import { useAuth } from './auth';

interface ICreateAlarmDTO {
  message: string;
  date: string;
  repeatType: 'time' | 'week' | 'day' | 'hour' | 'minute' | undefined;
  userInfo: {
    category: string;
  };
}

interface IAlarm {
  message: string;
  date: string;
  repeatType: 'time' | 'week' | 'day' | 'hour' | 'minute' | undefined;
  userInfo: {
    category: string;
    user_id: string;
    alarm_id: string;
  };
}

interface IParsedAlarm {
  message: string;
  date: string;
  repeatType: 'time' | 'week' | 'day' | 'hour' | 'minute' | undefined;
  userInfo: {
    category: string;
    user_id: string;
    alarm_id: string;
  };
}

interface IGetAlarmByRangeAndCategory {
  selectedDate: string;
  category: string;
}

interface IAlarmContextData {
  getAlarmByRangeAndCategory(
    data: IGetAlarmByRangeAndCategory,
  ): IAlarm | undefined;
  getAlarmByDate(selectedDate: string): IAlarm[];
  deleteAlarmById(id: string): Promise<IAlarm[]>;
  createAlarm(alarm: ICreateAlarmDTO): Promise<void>;
  updateAlarm(alarm: IAlarm): Promise<void>;
}

const AlarmContext = createContext<IAlarmContextData>({} as IAlarmContextData);

const AlarmProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [alarms, setAlarms] = useState<IAlarm[]>([]);

  const loadAlarms = useCallback(async () => {
    const alarmsExists = await AsyncStorage.getItem('@HealthApp:user:alarm');

    if (alarmsExists) {
      const parsedAlarms: IParsedAlarm[] = JSON.parse(alarmsExists);

      setAlarms(parsedAlarms);
    }
  }, []);

  useEffect(() => {
    loadAlarms();
  }, [loadAlarms]);

  const getAlarmByDate = useCallback(
    (selectedDate: string) => {
      const filterAlarms = alarms.filter(alarm =>
        isSameDay(parseISO(alarm.date), parseISO(selectedDate)),
      );

      return filterAlarms;
    },
    [alarms],
  );

  const getAlarmByRangeAndCategory = useCallback(
    ({ selectedDate, category }: IGetAlarmByRangeAndCategory) => {
      const filterAlarms = alarms.find(alarm => {
        if (alarm.userInfo.category !== category) {
          return false;
        }

        const resultDifferenceInMinutes = differenceInMinutes(
          parseISO(alarm.date),
          parseISO(selectedDate),
        );

        if (
          resultDifferenceInMinutes <= 10 &&
          resultDifferenceInMinutes >= -10
        ) {
          return true;
        }

        return false;
      });

      return filterAlarms;
    },
    [alarms],
  );

  const createAlarm = useCallback(
    async ({ date, message, repeatType, userInfo }: ICreateAlarmDTO) => {
      const storage = await AsyncStorage.getItem('@HealthApp:user:alarm');

      Object.assign(userInfo, { alarm_id: uuid(), user_id: user.id });

      const newAlarmWithDateAsString = {
        date,
        message,
        repeatType,
        userInfo,
      };

      // console.log('newAlarmWithDateAsString == ', newAlarmWithDateAsString);

      const parsedDate = parseISO(date);

      const newAlarm = {
        date: parsedDate,
        message,
        repeatType,
        userInfo,
      };

      if (storage && storage.length > 0) {
        const parsedStorage: IParsedAlarm[] = JSON.parse(storage);

        const updatedStorage = JSON.stringify([
          ...parsedStorage,
          newAlarmWithDateAsString,
        ]);

        await AsyncStorage.setItem('@HealthApp:user:alarm', updatedStorage);
      } else {
        await AsyncStorage.setItem(
          '@HealthApp:user:alarm',
          JSON.stringify([newAlarm]),
        );
      }

      PushNotification.localNotificationSchedule(newAlarm);

      loadAlarms();
    },
    [loadAlarms, user.id],
  );

  const deleteAlarmById = useCallback(
    async (id: string) => {
      const storage = await AsyncStorage.getItem('@HealthApp:user:alarm');

      if (storage && storage.length > 0) {
        const parsedStorage: IParsedAlarm[] = JSON.parse(storage);

        const updatedStorage = parsedStorage.filter(
          alarm => alarm.userInfo.alarm_id !== id,
        );

        PushNotification.cancelLocalNotifications({ id });

        await AsyncStorage.setItem(
          '@HealthApp:user:alarm',
          JSON.stringify(updatedStorage),
        );

        loadAlarms();

        return updatedStorage;
      }

      throw new Error('No alarms are set');
    },
    [loadAlarms],
  );

  const updateAlarm = useCallback(
    async ({ date, message, repeatType, userInfo }: IAlarm) => {
      const storage = await AsyncStorage.getItem('@HealthApp:user:alarm');

      if (storage && storage.length > 0) {
        const parsedStorage: IParsedAlarm[] = JSON.parse(storage);

        const updatedAlarms = parsedStorage.filter(
          alarm => alarm.userInfo.alarm_id !== userInfo.alarm_id,
        );

        PushNotification.cancelLocalNotifications({ id: userInfo.alarm_id });

        const newAlarmWithDateAsString = {
          date,
          message,
          repeatType,
          userInfo,
        };

        // console.log(newAlarmWithDateAsString);

        const stringifyAlarms = JSON.stringify([
          ...updatedAlarms,
          newAlarmWithDateAsString,
        ]);

        await AsyncStorage.setItem('@HealthApp:user:alarm', stringifyAlarms);

        const parsedDate = parseISO(date);

        const newAlarm = {
          date: parsedDate,
          message,
          repeatType,
          userInfo,
        };

        PushNotification.localNotificationSchedule(newAlarm);

        return loadAlarms();
      }

      throw new Error('No alarms are set');
    },
    [loadAlarms],
  );

  return (
    <AlarmContext.Provider
      value={{
        getAlarmByRangeAndCategory,
        deleteAlarmById,
        getAlarmByDate,
        createAlarm,
        updateAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
};

function useAlarm(): IAlarmContextData {
  const context = useContext(AlarmContext);

  if (!context) {
    throw new Error('Erro ao criar o contexto de alarme!');
  }

  return context;
}

export { AlarmProvider, useAlarm };
