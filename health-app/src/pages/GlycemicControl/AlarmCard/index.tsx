import React, { useState, useMemo, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteAlarmById } from 'react-native-simple-alarm';

import AlarmDetails from './AlarmDetails';

import {
  Container,
  TimeContainer,
  TimeText,
  MessageContainer,
  MessageText,
  CancelButtonContainer,
} from './style';

import { IAlarm } from '../index';

interface IAlarmCardProps {
  alarm: IAlarm;
  onChangeAlarms: React.Dispatch<React.SetStateAction<IAlarm[]>>;
}

const AlarmCard: React.FC<IAlarmCardProps> = ({ alarm, onChangeAlarms }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = useMemo(() => format(parseISO(alarm.date), 'HH:mm'), [
    alarm,
  ]);

  const deleteAlarm = useCallback(async () => {
    try {
      const attAlarms = await deleteAlarmById(alarm.id);

      onChangeAlarms(attAlarms);
    } catch (e) {
      console.log(e);
    }
  }, [alarm, onChangeAlarms]);

  return (
    <Container>
      <TimeContainer>
        <TimeText>{formattedDate}</TimeText>
      </TimeContainer>

      <MessageContainer onPress={() => setModalVisible(true)}>
        <MessageText>{alarm.message}</MessageText>
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
        onModalChange={setModalVisible}
      />
    </Container>
  );
};

export default AlarmCard;
