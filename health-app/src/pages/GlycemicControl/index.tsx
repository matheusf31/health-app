import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Emoji from 'react-native-emoji';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAlarms } from 'react-native-simple-alarm';

import DateInput from '../../components/DateInput';
import AlarmCard from './AlarmCard';
import AddAlarmModal from './AddAlarmModal';

import {
  Container,
  Title,
  TitleContainer,
  AlarmContainer,
  AddAlarmButton,
  FeelsContainer,
} from './styles';

import { useAuth } from '../../hooks/auth';

export interface IAlarm {
  id: number;
  date: string;
  message: string;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const [alarms, setAlarms] = useState<IAlarm[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addAlarmModalVisible, setAddAlarmModalVisible] = useState(false);

  useEffect(() => {
    async function loadAlarms(): Promise<void> {
      try {
        const allAlarms = await getAlarms();

        setAlarms(allAlarms);
      } catch (e) {
        console.log(e);
      }
    }

    loadAlarms();
  }, [addAlarmModalVisible]);

  return (
    <Container>
      <ScrollView>
        <DateInput
          mode="calendar"
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          showDateTimePicker={showDatePicker}
          onShowDateTimePickerChange={setShowDatePicker}
        />

        <AlarmContainer>
          <TitleContainer>
            <Emoji name=":alarm_clock:" style={{ fontSize: 16 }} />
            <Title>Alarmes</Title>
          </TitleContainer>

          {alarms.map(alarm => (
            <AlarmCard
              key={alarm.id}
              alarm={alarm}
              onChangeAlarms={setAlarms}
            />
          ))}

          <AddAlarmButton onPress={() => setAddAlarmModalVisible(true)}>
            <Icon
              name="ios-add"
              size={30}
              color="#146ba8"
              style={{ alignSelf: 'center' }}
            />
          </AddAlarmButton>
        </AlarmContainer>

        <FeelsContainer>
          <TitleContainer>
            <Emoji name=":grinning:" style={{ fontSize: 16 }} />
            <Title>Como está se sentindo hoje?</Title>
          </TitleContainer>
        </FeelsContainer>
      </ScrollView>

      <AddAlarmModal
        modalVisible={addAlarmModalVisible}
        onModalChange={setAddAlarmModalVisible}
      />
    </Container>
  );
};

export default Dashboard;
