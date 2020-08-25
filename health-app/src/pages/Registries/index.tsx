import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import Emoji from 'react-native-emoji';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO, isSameDay } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

// import PushNotification from 'react-native-push-notification';

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
  // useEffect(() => {
  //   PushNotification.cancelAllLocalNotifications();
  // }, []);

  const notification = useSelector((state: IStoreState) => state.notification);
  const dispatch = useDispatch();

  const { user } = useAuth();

  const [registries, setRegistries] = useState<IRegistries[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() =>
    format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx", { locale: pt }),
  );
  const [selectedFeels, setSelectedFeels] = useState('');
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

  const handleDeleteRegistry = useCallback((id: number) => {
    setRegistries(oldRegistries =>
      oldRegistries.filter(registry => registry.id !== id),
    );
  }, []);

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
            <Emoji name=":pencil:" style={{ fontSize: 20 }} />
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
            <Emoji name=":grinning:" style={{ fontSize: 20 }} />
          </TitleContainer>

          <Emojis
            selectedFeels={selectedFeels}
            onSelectedFeelsChange={setSelectedFeels}
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
