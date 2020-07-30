import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import Emoji from 'react-native-emoji';
import PushNotification from 'react-native-push-notification';

import RegisterImage from '../../assets/logos/note-list.svg';

import DateInput from '../../components/DateInput';
import BottomButton from '../../components/BottomButton';
import AddRegistryModal from './AddRegistryModal';
import RegistryCard from './RegistryCard';
import Emojis from './Emojis';

// import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Title,
  TitleContainer,
  FeelsContainer,
  RegisterContainer,
} from './styles';

export interface IRegistries {
  id: number;
  date: string;
  message: string;
  category: string;
  selfState: string;
}

const Registries: React.FC = () => {
  // const { signOut } = useAuth();

  // useEffect(() => {
  //   PushNotification.cancelAllLocalNotifications();
  // }, []);

  const [registries, setRegistries] = useState<IRegistries[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFeels, setSelectedFeels] = useState('');
  const [addRegistryModalVisible, setAddRegistryModalVisible] = useState(false);

  useEffect(() => {
    api.get('/registries').then(response => setRegistries(response.data));
  }, [addRegistryModalVisible, selectedDate]);

  const handleDeleteRegistry = useCallback((id: number) => {
    setRegistries(oldRegistries =>
      oldRegistries.filter(registry => registry.id !== id),
    );
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <DateInput
          mode="calendar"
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          showDateTimePicker={showDatePicker}
          onShowDateTimePickerChange={setShowDatePicker}
        />

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
        onModalVisibleChange={setAddRegistryModalVisible}
      />

      <BottomButton onPress={() => setAddRegistryModalVisible(true)} />

      {/* <Button title="sair" onPress={() => signOut()} /> */}
    </Container>
  );
};

export default Registries;
