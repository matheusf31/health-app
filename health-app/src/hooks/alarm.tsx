import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import { parseISO, isSameDay } from 'date-fns';
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
  date: string;
  repeatType: 'time' | 'week' | 'day' | 'hour' | 'minute' | undefined;
  userInfo: {
    category: string;
    user_id: string;
    alarm_id: string;
  };
}

interface IAlarmContextData {
  alarms: IAlarm[];
  getAlarmByDate(selectedDate: Date): IAlarm[];
  deleteAlarmById(id: string): Promise<IAlarm[]>;
  createAlarm(alarm: ICreateAlarmDTO): Promise<void>;
}

const AlarmContext = createContext<IAlarmContextData>({} as IAlarmContextData);

const AlarmProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [alarms, setAlarms] = useState<IAlarm[]>([]);

  const loadAlarms = useCallback(async () => {
    const alarmsExists = await AsyncStorage.getItem('@HealthApp:user:alarm');

    if (alarmsExists) {
      setAlarms(JSON.parse(alarmsExists));
    }
  }, []);

  useEffect(() => {
    loadAlarms();
  }, [loadAlarms]);

  const getAlarmByDate = useCallback(
    (selectedDate: Date) => {
      const filterAlarms = alarms.filter(alarm =>
        isSameDay(parseISO(alarm.date), selectedDate),
      );

      return filterAlarms;
    },
    [alarms],
  );

  const createAlarm = useCallback(
    async ({ date, message, repeatType, userInfo }: ICreateAlarmDTO) => {
      const storage = await AsyncStorage.getItem('@HealthApp:user:alarm');

      Object.assign(userInfo, { alarm_id: uuid(), user_id: user.id });

      const alarm = {
        date,
        message,
        repeatType,
        userInfo,
      };

      if (storage && storage.length > 0) {
        const updatedStorage = JSON.stringify([...JSON.parse(storage), alarm]);
        await AsyncStorage.setItem('@HealthApp:user:alarm', updatedStorage);
      } else {
        await AsyncStorage.setItem(
          '@HealthApp:user:alarm',
          JSON.stringify([alarm]),
        );
      }

      PushNotification.localNotificationSchedule(alarm);
      loadAlarms();
    },
    [loadAlarms],
  );

  const deleteAlarmById = useCallback(async (id: string) => {
    const storage = await AsyncStorage.getItem('@HealthApp:user:alarm');

    if (storage && storage.length > 0) {
      const parsedStorage: IAlarm[] = JSON.parse(storage);
      const updatedStorage = parsedStorage.filter(
        alarm => alarm.userInfo.alarm_id !== id,
      );

      PushNotification.cancelLocalNotifications({ id });

      await AsyncStorage.setItem(
        '@HealthApp:user:alarm',
        JSON.stringify(updatedStorage),
      );

      setAlarms(updatedStorage);

      return updatedStorage;
    }

    throw new Error('No alarms are set');
  }, []);

  return (
    <AlarmContext.Provider
      value={{
        alarms,
        deleteAlarmById,
        getAlarmByDate,
        createAlarm,
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
