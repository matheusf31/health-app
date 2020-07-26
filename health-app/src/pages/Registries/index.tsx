import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import Emoji from 'react-native-emoji';

import RegisterImage from '../../assets/logos/note-list.svg';
import DateInput from '../../components/DateInput';
import AddRegistryButton from './AddRegistryButton';
import AddRegistryModal from './AddRegistryModal';
import Emojis from './Emojis';

// import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  TitleContainer,
  FeelsContainer,
  RegisterContainer,
} from './styles';

const GlycemicControl: React.FC = () => {
  // const { signOut } = useAuth();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFeels, setSelectedFeels] = useState('');
  const [addRegistryModalVisible, setAddRegistryModalVisible] = useState(false);

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
        </RegisterContainer>

        <RegisterImage width={Dimensions.get('screen').width} height={200} />

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

      <AddRegistryButton onPress={() => setAddRegistryModalVisible(true)} />

      {/* <Button title="sair" onPress={() => signOut()} /> */}
    </Container>
  );
};

export default GlycemicControl;
