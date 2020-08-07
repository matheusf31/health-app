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

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  userInfo: {
    firstLogin: boolean;
  };
  goals: string[];
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  updateFirstLogin(): Promise<void>;
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

  // definir as metas aqui dentro
  const updateFirstLogin = useCallback(async () => {
    const response = await api.patch(`/users/${user.id}`, {
      userInfo: {
        firstLogin: false,
      },
    });

    const updatedUser = response.data;

    await AsyncStorage.setItem('@HealthApp:user', JSON.stringify(updatedUser));

    setUser(updatedUser);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updateFirstLogin,
      }}
    >
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
