import React, { useState, useRef, useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { createAlarm } from 'react-native-simple-alarm';

import DateInput from '../../../components/DateInput';
import Input from '../../../components/Input';

import {
  ModalContainer,
  ModalTitle,
  ModalTitleContainer,
  ModalCreateAlarmButton,
} from './styles';

interface IAddAlarmModalProps {
  modalVisible: boolean;
  onModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormSubmit {
  message: string;
}

const AddAlarmModal: React.FC<IAddAlarmModalProps> = ({
  modalVisible,
  onModalChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formRef = useRef<FormHandles>(null);

  const handleAddAlarm = useCallback(
    async (data: IFormSubmit) => {
      try {
        await createAlarm({
          active: true,
          date: selectedDate,
          message: data.message,
          snooze: 0,
        });
      } catch (e) {
        console.log(e);
      }

      onModalChange(false);
    },
    [selectedDate, onModalChange],
  );

  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={() => onModalChange(false)}
      onBackdropPress={() => onModalChange(false)}
      useNativeDriver
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ModalContainer>
          <ModalTitleContainer>
            <ModalTitle>Escolha a hora</ModalTitle>
          </ModalTitleContainer>

          <DateInput
            mode="time"
            selectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
            showDateTimePicker={showDatePicker}
            onShowDateTimePickerChange={setShowDatePicker}
          />

          <ModalTitleContainer>
            <ModalTitle>Deixe uma mensagem</ModalTitle>
          </ModalTitleContainer>

          <Form ref={formRef} onSubmit={handleAddAlarm}>
            <Input
              containerStyle={{ marginTop: 20 }}
              autoCapitalize="none"
              name="message"
              icon="ios-attach"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
          </Form>

          <ModalCreateAlarmButton onPress={() => formRef.current?.submitForm()}>
            Criar alarme
          </ModalCreateAlarmButton>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddAlarmModal;
