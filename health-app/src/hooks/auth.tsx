import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { interactionSuccess } from '../store/modules/notification/actions';

import api from '../services/api';

interface ISignInCredentials {
  email: string;
  password: string;
}

type IFeels = Array<{
  date: string;
  feel: string;
}>;

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  password: string;
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
  feels: IFeels;
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  onUpdateUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as IUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const userExists = await AsyncStorage.getItem('@HealthApp:user');

      if (userExists) {
        setUser(JSON.parse(userExists));
      }
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.get<IUser[]>(
      `users?email=${email}&password=${password}`,
    );

    const loggedUser = response.data[0];

    await AsyncStorage.setItem('@HealthApp:user', JSON.stringify(loggedUser));

    setUser(loggedUser);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@HealthApp:user');

    dispatch(interactionSuccess());

    setUser({} as IUser);
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        onUpdateUser: setUser,
      }}
    >
      {/* {console.log('USUÁRIO LOGADO => ', user, '\n')} */}
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Usuário não está autenticado.');
  }

  return context;
}

export { AuthProvider, useAuth };
