import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import { isSameDay, parseISO } from 'date-fns';
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

import { useAuth } from './auth';
// import api from '../services/api';

interface ICreateAlarmDTO {
  message: string;
  date: Date;
  repeatType: 'time' | 'week' | 'day' | 'hour' | 'minute' | undefined;
  userInfo: {
    category: string;
  };
}

interface IAlarm {
  message: string;
  date: Date;
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

interface IAlarmContextData {
  getAlarmByDate(selectedDate: Date): IAlarm[];
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

      const allAlarms = parsedAlarms.map(alarm => ({
        message: alarm.message,
        date: parseISO(alarm.date),
        repeatType: alarm.repeatType,
        userInfo: alarm.userInfo,
      }));

      setAlarms(allAlarms);
    }
  }, []);

  useEffect(() => {
    loadAlarms();
  }, [loadAlarms]);

  const getAlarmByDate = useCallback(
    (selectedDate: Date) => {
      const filterAlarms = alarms.filter(alarm =>
        isSameDay(alarm.date, selectedDate),
      );

      return filterAlarms;
    },
    [alarms],
  );

  const createAlarm = useCallback(
    async ({ date, message, repeatType, userInfo }: ICreateAlarmDTO) => {
      const storage = await AsyncStorage.getItem('@HealthApp:user:alarm');

      Object.assign(userInfo, { alarm_id: uuid(), user_id: user.id });

      const newAlarm = {
        date,
        message,
        repeatType,
        userInfo,
      };

      if (storage && storage.length > 0) {
        const parsedStorage: IParsedAlarm[] = JSON.parse(storage);

        // meu date após fazer o parse vem como string
        const allAlarms = parsedStorage.map(alarm => ({
          message: alarm.message,
          date: parseISO(alarm.date),
          repeatType: alarm.repeatType,
          userInfo: alarm.userInfo,
        }));

        const updatedStorage = JSON.stringify([...allAlarms, newAlarm]);

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

        const allAlarms = parsedStorage.map(alarm => ({
          message: alarm.message,
          date: parseISO(alarm.date),
          repeatType: alarm.repeatType,
          userInfo: alarm.userInfo,
        }));

        const updatedStorage = allAlarms.filter(
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

        const allAlarms = parsedStorage.map(alarm => ({
          message: alarm.message,
          date: parseISO(alarm.date),
          repeatType: alarm.repeatType,
          userInfo: alarm.userInfo,
        }));

        const updatedAlarms = allAlarms.filter(
          alarm => alarm.userInfo.alarm_id !== userInfo.alarm_id,
        );

        PushNotification.cancelLocalNotifications({ id: userInfo.alarm_id });

        const newAlarm = {
          date,
          message,
          repeatType,
          userInfo,
        };

        const stringifyAlarms = JSON.stringify([...updatedAlarms, newAlarm]);

        PushNotification.localNotificationSchedule(newAlarm);

        await AsyncStorage.setItem('@HealthApp:user:alarm', stringifyAlarms);

        return loadAlarms();
      }

      throw new Error('No alarms are set');
    },
    [loadAlarms],
  );

  return (
    <AlarmContext.Provider
      value={{
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
