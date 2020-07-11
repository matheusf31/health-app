import React, { useState, useMemo, useCallback } from 'react';
import Modal from 'react-native-modal';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
import Emoji from 'react-native-emoji';
import { deleteAlarmById } from 'react-native-simple-alarm';

import {
  Container,
  TimeContainer,
  TimeText,
  MessageContainer,
  MessageText,
  CancelButtonContainer,
  ModalContainer,
  ModalTitleContainer,
  ModalTitle,
} from './style';

import { IAlarm } from '../index';

interface IAlarmCardProps {
  alarm: IAlarm;
  onChangeAlarms: React.Dispatch<React.SetStateAction<IAlarm[]>>;
}

const AlarmCard: React.FC<IAlarmCardProps> = ({ alarm, onChangeAlarms }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const formatedDate = useMemo(() => format(parseISO(alarm.date), 'hh:mm'), [
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
        <TimeText>{formatedDate}</TimeText>
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

      <Modal
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver
      >
        <ModalContainer>
          <ModalTitleContainer>
            <Emoji name=":pencil2:" style={{ fontSize: 16 }} />
            <ModalTitle>Anotações</ModalTitle>
          </ModalTitleContainer>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default AlarmCard;
