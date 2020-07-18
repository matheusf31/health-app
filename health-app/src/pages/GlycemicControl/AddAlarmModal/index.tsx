import React, { useState, useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { createAlarm } from 'react-native-simple-alarm';

import DateInput from '../../../components/DateInput';

import {
  ModalContainer,
  ModalTitle,
  ModalTitleContainer,
  ModalCategoryContainer,
  ModalCategoryButton,
  ModalCategoryButtonText,
  TextInputContainer,
  TextInputIconContainer,
  Icon,
  TextInput,
  ModalCreateAlarmButton,
} from './styles';

interface IAddAlarmModalProps {
  modalVisible: boolean;
  onModalChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAlarmModal: React.FC<IAddAlarmModalProps> = ({
  modalVisible,
  onModalChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleLeaveModal = useCallback(() => {
    onModalChange(false);
    setCategory('');
    setMessage('');
    setSelectedDate(new Date());
  }, [onModalChange]);

  const handleAddAlarm = useCallback(async () => {
    let autoMessage;

    if (category === 'blood-glucose') autoMessage = 'medir';

    if (category === 'insulin-therapy') autoMessage = 'aplicar';

    try {
      await createAlarm({
        active: true,
        date: selectedDate,
        message: autoMessage || message,
        snooze: 0,
        userInfo: {
          category,
        },
      });
    } catch (e) {
      console.log(e);
    }

    handleLeaveModal();
  }, [selectedDate, category, handleLeaveModal, message]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    // Arrumar
    setIsFilled(message !== '');
  }, [message]);

  return (
    <Modal
      isVisible={modalVisible}
      onBackButtonPress={handleLeaveModal}
      onBackdropPress={handleLeaveModal}
      useNativeDriver
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ModalContainer>
          <ModalTitleContainer>
            <ModalTitle>Selecione a hora</ModalTitle>
          </ModalTitleContainer>

          <DateInput
            mode="time"
            selectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
            showDateTimePicker={showDatePicker}
            onShowDateTimePickerChange={setShowDatePicker}
            containerStyle={{ marginTop: -10 }}
          />

          <ModalTitleContainer style={{ marginTop: 20 }}>
            <ModalTitle>Selecione a categoria</ModalTitle>
          </ModalTitleContainer>

          <ModalCategoryContainer>
            <ModalCategoryButton
              selected={category === 'physical-activity'}
              onPress={() => setCategory('physical-activity')}
            >
              <ModalCategoryButtonText
                selected={category === 'physical-activity'}
              >
                Atividade física
              </ModalCategoryButtonText>
            </ModalCategoryButton>

            <ModalCategoryButton
              selected={category === 'blood-glucose'}
              onPress={() => setCategory('blood-glucose')}
            >
              <ModalCategoryButtonText selected={category === 'blood-glucose'}>
                Glicemia
              </ModalCategoryButtonText>
            </ModalCategoryButton>

            <ModalCategoryButton
              selected={category === 'insulin-therapy'}
              onPress={() => setCategory('insulin-therapy')}
            >
              <ModalCategoryButtonText
                selected={category === 'insulin-therapy'}
              >
                Insulinoterapia
              </ModalCategoryButtonText>
            </ModalCategoryButton>
          </ModalCategoryContainer>

          {category === 'physical-activity' && (
            <>
              <ModalTitleContainer>
                <ModalTitle>Atividade</ModalTitle>
              </ModalTitleContainer>

              <TextInputContainer isFocused={isFocused}>
                <TextInputIconContainer>
                  <Icon
                    name="pencil"
                    size={20}
                    color={isFocused || isFilled ? '#146ba8' : '#89828E'}
                  />
                </TextInputIconContainer>

                <TextInput
                  keyboardAppearance="dark"
                  placeholderTextColor="#89828E"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  defaultValue={message}
                  onChangeText={value => {
                    setMessage(value);
                  }}
                />
              </TextInputContainer>
            </>
          )}
        </ModalContainer>
      </TouchableWithoutFeedback>

      <ModalCreateAlarmButton onPress={handleAddAlarm}>
        Criar alarme
      </ModalCreateAlarmButton>
    </Modal>
  );
};

export default AddAlarmModal;
