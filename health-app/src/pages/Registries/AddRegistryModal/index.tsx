import React, { useState, useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';

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
  selectedDate: Date;
  modalVisible: boolean;
  onModalVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
}

type IRepeat = 'week' | 'day' | 'time' | 'hour' | 'minute' | undefined;

const AddAlarmModal: React.FC<IAddAlarmModalProps> = ({
  selectedDate,
  modalVisible,
  onModalVisibleChange,
}) => {
  // const { createAlarm } = useAlarm();

  const [selectedHour, setSelectedHour] = useState(
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      new Date().getHours(),
      new Date().getMinutes(),
    ),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleLeaveModal = useCallback(() => {
    onModalVisibleChange(false);
    setCategory('');
    setMessage('');
    setSelectedHour(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
      ),
    );
  }, [onModalVisibleChange, selectedDate]);

  const handleAddRegistry = useCallback(async () => {
    console.log('add registry');
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

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
            selectedDate={selectedHour}
            onSelectedDateChange={setSelectedHour}
            showDateTimePicker={showDatePicker}
            onShowDateTimePickerChange={setShowDatePicker}
            containerStyle={{ marginTop: -10, marginBottom: 10 }}
          />

          <ModalTitleContainer>
            <ModalTitle>Selecione a categoria</ModalTitle>
          </ModalTitleContainer>

          <ModalCategoryContainer>
            <ModalCategoryButton
              selected={category === 'physical-activity'}
              onPress={() =>
                setCategory(prevState =>
                  prevState === 'physical-activity' ? '' : 'physical-activity',
                )
              }
            >
              <ModalCategoryButtonText
                selected={category === 'physical-activity'}
              >
                Atividade física
              </ModalCategoryButtonText>
            </ModalCategoryButton>

            <ModalCategoryButton
              selected={category === 'blood-glucose'}
              onPress={() =>
                setCategory(prevState =>
                  prevState === 'blood-glucose' ? '' : 'blood-glucose',
                )
              }
            >
              <ModalCategoryButtonText selected={category === 'blood-glucose'}>
                Glicemia
              </ModalCategoryButtonText>
            </ModalCategoryButton>

            <ModalCategoryButton
              selected={category === 'insulin-therapy'}
              onPress={() =>
                setCategory(prevState =>
                  prevState === 'insulin-therapy' ? '' : 'insulin-therapy',
                )
              }
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

          {category === 'blood-glucose' && (
            <>
              <ModalTitleContainer>
                <ModalTitle>Glicose no sangue (mg/dL)</ModalTitle>
              </ModalTitleContainer>

              <TextInputContainer isFocused={isFocused}>
                <TextInputIconContainer>
                  <Icon
                    name="water"
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

      <ModalCreateAlarmButton onPress={handleAddRegistry}>
        Criar registro
      </ModalCreateAlarmButton>
    </Modal>
  );
};

export default AddAlarmModal;
