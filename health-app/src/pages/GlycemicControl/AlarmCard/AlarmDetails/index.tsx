import React, { useState } from 'react';
import Modal from 'react-native-modal';
import Emoji from 'react-native-emoji';

import DateInput from '../../../../components/DateInput';
import Button from '../../../../components/Button';

import {
  ModalContainer,
  ModalTitle,
  ModalTitleContainer,
  ModalAlarmMessageContainer,
  ModalAlarmMessageTextContainer,
  ModalAlarmMessageText,
  ModalAlarmMessageButton,
} from './styles';

import { IAlarm } from '../../index';

interface IAlarmDetailsProps {
  alarm: IAlarm;
  modalVisible: boolean;
  onModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmDetails: React.FC<IAlarmDetailsProps> = ({
  alarm,
  modalVisible,
  onModalChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={() => onModalChange(false)}
      onBackdropPress={() => onModalChange(false)}
      useNativeDriver
    >
      <ModalContainer>
        <ModalTitleContainer
          style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
        >
          <ModalTitle>Horário</ModalTitle>
        </ModalTitleContainer>

        <DateInput
          mode="time"
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          showDateTimePicker={showDatePicker}
          onShowDateTimePickerChange={setShowDatePicker}
          containerStyle={{ marginTop: -15, marginBottom: 20 }}
        />

        <ModalTitleContainer>
          <ModalTitle>Mensagem</ModalTitle>
        </ModalTitleContainer>

        <ModalAlarmMessageContainer>
          <ModalAlarmMessageTextContainer>
            {alarm && (
              <ModalAlarmMessageText>{alarm.message}</ModalAlarmMessageText>
            )}
          </ModalAlarmMessageTextContainer>

          <ModalAlarmMessageButton>
            <Emoji name=":pencil2:" style={{ fontSize: 16 }} />
          </ModalAlarmMessageButton>
        </ModalAlarmMessageContainer>

        <ModalTitleContainer>
          <ModalTitle>Registro</ModalTitle>
        </ModalTitleContainer>
      </ModalContainer>

      <Button>Salvar</Button>
    </Modal>
  );
};

export default AlarmDetails;
