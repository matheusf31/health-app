import React, { useState, useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import { useAlarm } from '../../../hooks/alarm';

import DateInput from '../../../components/DateInput';

import {
  ModalContainer,
  ModalTitle,
  ModalTitleContainer,
  ModalRepetitionColumn,
  ModalRepetitionContainer,
  ModalRadioContainer,
  ModalRepetitionButton,
  ModalRepetitionButtonText,
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
  const { createAlarm } = useAlarm();
  const navigation = useNavigation();

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
  const [repeatType, setRepeatType] = useState<IRepeat>(undefined);
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleLeaveModal = useCallback(() => {
    onModalVisibleChange(false);
    setCategory('');
    setRepeatType(undefined);
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

  const handleAddAlarm = useCallback(async () => {
    let autoMessage: string | undefined;

    if (category === 'blood-glucose') autoMessage = 'medir';

    if (category === 'insulin-therapy') autoMessage = 'aplicar';

    try {
      await createAlarm({
        date: selectedDate,
        message: autoMessage || message,
        repeatType,
        userInfo: {
          category,
        },
      });
    } catch (e) {
      console.log(e);
    }

    handleLeaveModal();
  }, [
    selectedDate,
    category,
    handleLeaveModal,
    message,
    createAlarm,
    repeatType,
  ]);

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
            containerStyle={{ marginTop: -10 }}
          />

          <ModalTitleContainer>
            <ModalTitle>Repetir</ModalTitle>
          </ModalTitleContainer>

          <ModalRepetitionColumn>
            <ModalRepetitionContainer>
              <ModalRadioContainer
                onPress={() =>
                  setRepeatType(prevState =>
                    prevState === 'hour' ? undefined : 'hour',
                  )
                }
              >
                <ModalRepetitionButton selected={repeatType === 'hour'} />

                <ModalRepetitionButtonText selected={repeatType === 'hour'}>
                  A cada hora
                </ModalRepetitionButtonText>
              </ModalRadioContainer>

              <ModalRadioContainer
                onPress={() =>
                  setRepeatType(prevState =>
                    prevState === 'week' ? undefined : 'week',
                  )
                }
              >
                <ModalRepetitionButton selected={repeatType === 'week'} />

                <ModalRepetitionButtonText selected={repeatType === 'week'}>
                  Semanalmente
                </ModalRepetitionButtonText>
              </ModalRadioContainer>
            </ModalRepetitionContainer>

            <ModalRepetitionContainer>
              <ModalRadioContainer
                onPress={() =>
                  setRepeatType(prevState =>
                    prevState === 'day' ? undefined : 'day',
                  )
                }
              >
                <ModalRepetitionButton selected={repeatType === 'day'} />

                <ModalRepetitionButtonText selected={repeatType === 'day'}>
                  Diariamente
                </ModalRepetitionButtonText>
              </ModalRadioContainer>

              {/* <ModalRadioContainer
                onPress={() =>
                  setRepeatType(prevState =>
                    prevState === 'month' ? undefined : 'month',
                  )
                }
              >
                <ModalRepetitionButton selected={repeatType === 'month'} />

                <ModalRepetitionButtonText selected={repeatType === 'month'}>
                  Mensalmente
                </ModalRepetitionButtonText>
              </ModalRadioContainer> */}
            </ModalRepetitionContainer>
          </ModalRepetitionColumn>

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
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholderTextColor="#89828E"
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
        Criar notificação
      </ModalCreateAlarmButton>
    </Modal>
  );
};

export default AddAlarmModal;
