import React, { useEffect, useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import Emoji from 'react-native-emoji';
import Icon from 'react-native-vector-icons/Ionicons';

import DateInput from '../../components/DateInput';
import AlarmCard from './AlarmCard';
import AddAlarmModal from './AddAlarmModal';
import AddRegistryButton from './AddRegistryButton';
import Emojis from './Emojis';

// import { useAuth } from '../../hooks/auth';
import { useAlarm } from '../../hooks/alarm';

import {
  Container,
  Title,
  TitleContainer,
  AlarmContainer,
  AlarmCategoryText,
  AlarmCardListContainer,
  AddAlarmButton,
  FeelsContainer,
} from './styles';

export interface IAlarm {
  message: string;
  date: string;
  repeatType: 'time' | 'week' | 'day' | 'hour' | 'minute' | undefined;
  userInfo: {
    category: string;
    user_id: string;
    alarm_id: string;
  };
}

const GlycemicControl: React.FC = () => {
  // const { signOut } = useAuth();
  const { getAlarmByDate } = useAlarm();

  const [alarms, setAlarms] = useState<IAlarm[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addAlarmModalVisible, setAddAlarmModalVisible] = useState(false);
  const [selectedFeels, setSelectedFeels] = useState('');

  useEffect(() => {
    async function loadAlarms(): Promise<void> {
      try {
        const allAlarms: IAlarm[] = getAlarmByDate(selectedDate);

        setAlarms(allAlarms);
      } catch (e) {
        console.log(e);
      }
    }

    loadAlarms();
  }, [addAlarmModalVisible, selectedDate, getAlarmByDate]);

  const physicalActivity = useMemo(
    () =>
      alarms.filter(alarm => alarm.userInfo.category === 'physical-activity'),
    [alarms],
  );

  const bloodGlucose = useMemo(
    () => alarms.filter(alarm => alarm.userInfo.category === 'blood-glucose'),
    [alarms],
  );

  const insulinTherapy = useMemo(
    () => alarms.filter(alarm => alarm.userInfo.category === 'insulin-therapy'),
    [alarms],
  );

  const withoutCategory = useMemo(
    () => alarms.filter(alarm => alarm.userInfo.category === ''),
    [alarms],
  );

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

        <AlarmContainer>
          <TitleContainer>
            <Title>Alarmes</Title>
            <Emoji name=":alarm_clock:" style={{ fontSize: 20 }} />
          </TitleContainer>

          {physicalActivity.length > 0 && (
            <AlarmCardListContainer>
              <AlarmCategoryText>Atividade física</AlarmCategoryText>

              {physicalActivity.map(alarm => (
                <AlarmCard
                  selectedDate={selectedDate}
                  key={alarm.userInfo.alarm_id}
                  alarm={alarm}
                  onChangeAlarms={setAlarms}
                />
              ))}
            </AlarmCardListContainer>
          )}

          {bloodGlucose.length > 0 && (
            <AlarmCardListContainer>
              <AlarmCategoryText>Glicemia</AlarmCategoryText>

              {bloodGlucose.map(alarm => (
                <AlarmCard
                  selectedDate={selectedDate}
                  key={alarm.userInfo.alarm_id}
                  alarm={alarm}
                  onChangeAlarms={setAlarms}
                />
              ))}
            </AlarmCardListContainer>
          )}

          {insulinTherapy.length > 0 && (
            <AlarmCardListContainer>
              <AlarmCategoryText>Insulinoterapia</AlarmCategoryText>

              {insulinTherapy.map(alarm => (
                <AlarmCard
                  selectedDate={selectedDate}
                  key={alarm.userInfo.alarm_id}
                  alarm={alarm}
                  onChangeAlarms={setAlarms}
                />
              ))}
            </AlarmCardListContainer>
          )}

          {withoutCategory.length > 0 && (
            <AlarmCardListContainer>
              <AlarmCategoryText>Sem categoria</AlarmCategoryText>

              {withoutCategory.map(alarm => (
                <AlarmCard
                  selectedDate={selectedDate}
                  key={alarm.userInfo.alarm_id}
                  alarm={alarm}
                  onChangeAlarms={setAlarms}
                />
              ))}
            </AlarmCardListContainer>
          )}

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
            <Title>Como está se sentindo hoje?</Title>
            <Emoji name=":grinning:" style={{ fontSize: 20 }} />
          </TitleContainer>

          <Emojis
            selectedFeels={selectedFeels}
            onSelectedFeelsChange={setSelectedFeels}
          />
        </FeelsContainer>

        <FeelsContainer>
          <TitleContainer>
            <Title>Registros</Title>
          </TitleContainer>
        </FeelsContainer>
        {/* <AddRegistryButton /> */}
      </ScrollView>

      <AddAlarmModal
        selectedDate={selectedDate}
        modalVisible={addAlarmModalVisible}
        onModalVisibleChange={setAddAlarmModalVisible}
      />

      <AddRegistryButton />
      {/* <Button title="sair" onPress={() => signOut()} /> */}
    </Container>
  );
};

export default GlycemicControl;
