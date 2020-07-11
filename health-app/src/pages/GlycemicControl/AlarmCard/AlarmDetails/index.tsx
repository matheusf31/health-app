import React, { useState } from 'react';
import Modal from 'react-native-modal';

import DateInput from '../../../../components/DateInput';

import { ModalContainer, ModalTitle, ModalTitleContainer } from './styles';

interface IAlarmDetailsProps {
  modalVisible: boolean;
  onModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmDetails: React.FC<IAlarmDetailsProps> = ({
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
        <ModalTitleContainer>
          <ModalTitle>Edite o horário</ModalTitle>
        </ModalTitleContainer>

        <DateInput
          mode="time"
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          showDateTimePicker={showDatePicker}
          onShowDateTimePickerChange={setShowDatePicker}
        />

        <ModalTitleContainer>
          <ModalTitle>Edite a mensagem do alarme</ModalTitle>
        </ModalTitleContainer>

        <ModalTitleContainer>
          <ModalTitle>Registro de aplicação</ModalTitle>
        </ModalTitleContainer>
      </ModalContainer>
    </Modal>
  );
};

export default AlarmDetails;
