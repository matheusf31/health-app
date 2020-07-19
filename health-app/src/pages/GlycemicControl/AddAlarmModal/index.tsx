import React, { useState, useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
// import { createAlarm } from 'react-native-simple-alarm';

import { useAlarm } from '../../../hooks/alarm';

import DateInput from '../../../components/DateInput';

import {
  ModalContainer,
  ModalTitle,
  ModalTitleContainer,
  Test,
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
  onSelectedDateChange: React.Dispatch<React.SetStateAction<Date>>;
}

type IRepeat =
  | 'month'
  | 'week'
  | 'day'
  | 'time'
  | 'hour'
  | 'minute'
  | undefined;

const AddAlarmModal: React.FC<IAddAlarmModalProps> = ({
  selectedDate,
  modalVisible,
  onModalVisibleChange,
  onSelectedDateChange,
}) => {
  const { createAlarm } = useAlarm();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [repeat, setRepeat] = useState<IRepeat>(undefined);
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleLeaveModal = useCallback(() => {
    onModalVisibleChange(false);
    setCategory('');
    setRepeat(undefined);
    setMessage('');
    onSelectedDateChange(new Date());
  }, [onModalVisibleChange, onSelectedDateChange]);

  const handleAddAlarm = useCallback(async () => {
    let autoMessage: string | undefined;

    if (category === 'blood-glucose') autoMessage = 'medir';

    if (category === 'insulin-therapy') autoMessage = 'aplicar';

    try {
      await createAlarm({
        date: selectedDate,
        message: autoMessage || message,
        repeatType: 'hour',
        userInfo: {
          category,
        },
      });
    } catch (e) {
      console.log(e);
    }

    handleLeaveModal();
  }, [selectedDate, category, handleLeaveModal, message, createAlarm]);

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
            onSelectedDateChange={onSelectedDateChange}
            showDateTimePicker={showDatePicker}
            onShowDateTimePickerChange={setShowDatePicker}
            containerStyle={{ marginTop: -10 }}
          />

          <ModalTitleContainer>
            <ModalTitle>Repetir</ModalTitle>
          </ModalTitleContainer>

          <Test>
            <ModalRepetitionContainer>
              <ModalRadioContainer>
                <ModalRepetitionButton
                  selected={repeat === 'hour'}
                  onPress={() =>
                    setRepeat(prevState =>
                      prevState === 'hour' ? undefined : 'hour',
                    )
                  }
                />

                <ModalRepetitionButtonText selected={repeat === 'hour'}>
                  Por hora
                </ModalRepetitionButtonText>
              </ModalRadioContainer>

              <ModalRadioContainer>
                <ModalRepetitionButton
                  selected={repeat === 'day'}
                  onPress={() =>
                    setRepeat(prevState =>
                      prevState === 'day' ? undefined : 'day',
                    )
                  }
                />

                <ModalRepetitionButtonText selected={repeat === 'day'}>
                  Diariamente
                </ModalRepetitionButtonText>
              </ModalRadioContainer>
            </ModalRepetitionContainer>

            <ModalRepetitionContainer>
              <ModalRadioContainer>
                <ModalRepetitionButton
                  selected={repeat === 'week'}
                  onPress={() =>
                    setRepeat(prevState =>
                      prevState === 'week' ? undefined : 'week',
                    )
                  }
                />

                <ModalRepetitionButtonText selected={repeat === 'week'}>
                  Semanalmente
                </ModalRepetitionButtonText>
              </ModalRadioContainer>

              <ModalRadioContainer>
                <ModalRepetitionButton
                  selected={repeat === 'month'}
                  onPress={() =>
                    setRepeat(prevState =>
                      prevState === 'month' ? undefined : 'month',
                    )
                  }
                />

                <ModalRepetitionButtonText selected={repeat === 'month'}>
                  Mensalmente
                </ModalRepetitionButtonText>
              </ModalRadioContainer>
            </ModalRepetitionContainer>
          </Test>

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
        </ModalContainer>
      </TouchableWithoutFeedback>

      <ModalCreateAlarmButton onPress={handleAddAlarm}>
        Criar notificação
      </ModalCreateAlarmButton>
    </Modal>
  );
};

export default AddAlarmModal;
