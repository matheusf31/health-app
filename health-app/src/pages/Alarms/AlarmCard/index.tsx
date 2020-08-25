import React, { useState, useMemo, useCallback } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
// import { deleteAlarmById } from 'react-native-simple-alarm';

import { useAlarm } from '../../../hooks/alarm';

import AlarmDetails from './AlarmDetails';

import {
  Container,
  TimeContainer,
  TimeText,
  MessageContainer,
  MessageText,
  CancelButtonContainer,
} from './styles';

import { IAlarm } from '../index';

interface IAlarmCardProps {
  alarm: IAlarm;
  onChangeAlarms: React.Dispatch<React.SetStateAction<IAlarm[]>>;
  selectedDate: string;
}

const AlarmCard: React.FC<IAlarmCardProps> = ({
  alarm,
  selectedDate,
  onChangeAlarms,
}) => {
  const { deleteAlarmById } = useAlarm();

  const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = useMemo(() => format(parseISO(alarm.date), 'HH:mm'), [
    alarm,
  ]);

  const deleteAlarm = useCallback(async () => {
    try {
      let attAlarms: IAlarm[] = await deleteAlarmById(alarm.userInfo.alarm_id);

      attAlarms = attAlarms.filter(eachAlarm =>
        isSameDay(parseISO(eachAlarm.date), parseISO(selectedDate)),
      );

      onChangeAlarms(attAlarms);
    } catch (e) {
      console.log(e);
    }
  }, [alarm, onChangeAlarms, selectedDate, deleteAlarmById]);

  const repeatTypeFormatted = useMemo(() => {
    return alarm.repeatType === 'day'
      ? 'dia'
      : alarm.repeatType === 'hour'
      ? 'hora'
      : alarm.repeatType === 'week'
      ? 'semana'
      : '';
  }, [alarm]);

  return (
    <Container>
      <TimeContainer>
        <TimeText>{formattedDate}</TimeText>
      </TimeContainer>

      <MessageContainer onPress={() => setModalVisible(true)}>
        {alarm.message !== '' && (
          <MessageText style={{ fontWeight: 'bold' }}>
            {alarm.message}
          </MessageText>
        )}

        {repeatTypeFormatted !== '' && (
          <MessageText>repetido por {repeatTypeFormatted}</MessageText>
        )}
      </MessageContainer>

      <CancelButtonContainer onPress={deleteAlarm}>
        <Icon
          name="ios-close"
          size={30}
          color="red"
          style={{ marginRight: 20 }}
        />
      </CancelButtonContainer>

      <AlarmDetails
        alarm={alarm}
        modalVisible={modalVisible}
        onModalVisibleChange={setModalVisible}
      />
    </Container>
  );
};

export default AlarmCard;
