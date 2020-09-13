import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO, isSameDay } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import AsyncStorage from '@react-native-community/async-storage';

import RegisterImage from '../../assets/logos/note-list.svg';

import DateInput from '../../components/DateInput';
import BottomButton from '../../components/BottomButton';
import OpenDrawerButton from '../../components/OpenDrawerButton';
import AddRegistryModal from './AddRegistryModal';
import RegistryCard from './RegistryCard';
import Emojis from './Emojis';

import api from '../../services/api';

import {
  Container,
  HeaderContainer,
  HeaderDateInputView,
  RegisterContainer,
  TitleContainer,
  Title,
  FeelsContainer,
} from './styles';

import { IStoreState } from '../../store/createStore';
import { useAuth } from '../../hooks/auth';

export interface IRegistries {
  id: number;
  date: string;
  message: string;
  category: 'blood-glucose' | 'insulin-therapy' | 'physical-activity';
  selfState: string;
}

const Registries: React.FC = () => {
  const notification = useSelector((state: IStoreState) => state.notification);
  const dispatch = useDispatch();

  const { user, onUpdateUser } = useAuth();

  const [registries, setRegistries] = useState<IRegistries[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx", { locale: pt }),
  );
  const [selectedFeel, setSelectedFeel] = useState('');
  const [addRegistryModalVisible, setAddRegistryModalVisible] = useState(false);

  useEffect(() => {
    api.get<IRegistries[]>(`/registries?user_id=${user.id}`).then(response => {
      const filterRegister = response.data.filter(filteredRegistry =>
        isSameDay(parseISO(filteredRegistry.date), parseISO(selectedDate)),
      );

      return setRegistries(filterRegister);
    });
  }, [addRegistryModalVisible, selectedDate, user]);

  useEffect(() => {
    if (notification.hasNotificationInteraction) {
      setAddRegistryModalVisible(true);
    }
  }, [notification, dispatch]);

  // pegar o último feel naquele dia e colocar ele como o atual
  useEffect(() => {
    api.get(`users/${user.id}`).then(response => {
      const tempUser = response.data;

      const filteredFeels = tempUser.feels.filter((feel: { date: string }) =>
        isSameDay(parseISO(feel.date), parseISO(selectedDate)),
      );

      if (filteredFeels.length > 0) {
        const lastFeel = filteredFeels.sort(
          (a: { date: string }, b: { date: string }) =>
            Date.parse(b.date) - Date.parse(a.date),
        )[0];

        setSelectedFeel(lastFeel.feel);
      } else {
        setSelectedFeel('');
      }
    });
  }, [user.id, selectedDate]);

  const handleDeleteRegistry = useCallback((id: number) => {
    setRegistries(oldRegistries =>
      oldRegistries.filter(registry => registry.id !== id),
    );
  }, []);

  const handleChangeFeels = useCallback(
    async (feel: string) => {
      setSelectedFeel(feel);

      const formattedDate = parseISO(selectedDate);

      const response = await api.put(`/users/${user.id}`, {
        ...user,
        feels: [
          ...user.feels,
          {
            date: format(
              new Date(
                formattedDate.getFullYear(),
                formattedDate.getMonth(),
                formattedDate.getDate(),
                new Date().getHours(),
                new Date().getMinutes(),
                new Date().getSeconds(),
              ),
              "yyyy-MM-dd'T'HH:mm:ssxxx",
              {
                locale: pt,
              },
            ),
            feel,
          },
        ],
      });

      await AsyncStorage.setItem(
        '@HealthApp:user',
        JSON.stringify(response.data),
      );

      onUpdateUser(response.data);
    },
    [selectedDate, user, onUpdateUser],
  );

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <HeaderContainer>
          <OpenDrawerButton />

          <HeaderDateInputView>
            <DateInput
              mode="calendar"
              selectedDate={selectedDate}
              onSelectedDateChange={setSelectedDate}
              showDateTimePicker={showDatePicker}
              onShowDateTimePickerChange={setShowDatePicker}
            />
          </HeaderDateInputView>
        </HeaderContainer>

        <RegisterContainer>
          <TitleContainer>
            <Title>Registros</Title>
            {/* <Emoji name=":pencil:" style={{ fontSize: 20 }} /> */}
          </TitleContainer>

          {registries.map(registry => (
            <RegistryCard
              key={registry.id}
              registry={registry}
              selectedDate={selectedDate}
              onDeleteRegistry={handleDeleteRegistry}
            />
          ))}
        </RegisterContainer>

        {registries.length === 0 && (
          <RegisterImage width={Dimensions.get('screen').width} height={200} />
        )}

        <FeelsContainer>
          <TitleContainer>
            <Title>Como está se sentindo hoje?</Title>
            {/* <Emoji name=":grinning:" style={{ fontSize: 20 }} /> */}
          </TitleContainer>

          <Emojis
            selectedFeel={selectedFeel}
            handleChangeFeels={handleChangeFeels}
          />
        </FeelsContainer>
      </ScrollView>

      <AddRegistryModal
        selectedDate={selectedDate}
        modalVisible={addRegistryModalVisible}
        onSelectedDateChange={setSelectedDate}
        onModalVisibleChange={setAddRegistryModalVisible}
      />

      <BottomButton onPress={() => setAddRegistryModalVisible(true)} />
    </Container>
  );
};

export default Registries;
