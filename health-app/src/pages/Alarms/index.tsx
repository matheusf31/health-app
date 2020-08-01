import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import Emoji from 'react-native-emoji';

import { useNavigation } from '@react-navigation/native';
import { setupPushNotification } from '../../utils/pushNotificationConfig';

import { useAlarm } from '../../hooks/alarm';

import AlarmCard from './AlarmCard';
import AddAlarmModal from './AddAlarmModal';
import DateInput from '../../components/DateInput';
import BottomButton from '../../components/BottomButton';

import AlarmImage from '../../assets/logos/alarm.svg';

import {
  Container,
  AlarmContainer,
  TitleContainer,
  Title,
  AlarmCardListContainer,
  AlarmCategoryText,
} from './styles';

export interface IAlarm {
  message: string;
  date: Date;
  repeatType: 'time' | 'week' | 'day' | 'hour' | 'minute' | undefined;
  userInfo: {
    category: string;
    user_id: string;
    alarm_id: string;
  };
}

const Alarm: React.FC = () => {
  const navigation = useNavigation();
  const [alarms, setAlarms] = useState<IAlarm[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [addAlarmModalVisible, setAddAlarmModalVisible] = useState(false);

  const { getAlarmByDate } = useAlarm();

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

  const handleNotificationOpen = useCallback(
    notification => {
      // consigo enviar a category por aqui
      navigation.navigate('Registry', {
        openModal: true,
      });

      console.log(notification);
    },
    [navigation],
  );

  useEffect(() => {
    setupPushNotification(handleNotificationOpen);
  }, [handleNotificationOpen]);

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

          {alarms.length === 0 && (
            <AlarmImage
              width={Dimensions.get('screen').width}
              height={200}
              style={{ marginTop: 20 }}
            />
          )}

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
        </AlarmContainer>

        <AddAlarmModal
          selectedDate={selectedDate}
          modalVisible={addAlarmModalVisible}
          onModalVisibleChange={setAddAlarmModalVisible}
        />
      </ScrollView>

      <BottomButton onPress={() => setAddAlarmModalVisible(true)} />
    </Container>
  );
};

export default Alarm;
