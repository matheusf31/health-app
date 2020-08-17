import React, { useState, useCallback, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';

import { IStoreState } from '../../../store/createStore';
import { interactionSuccess } from '../../../store/modules/notification/actions';

import api from '../../../services/api';

import FadeInView from './FadeView';
import DateInput from '../../../components/DateInput';

import Fasting from '../../../assets/blood-glucose/jejum.svg';
import PreMeal from '../../../assets/blood-glucose/pre-refeicao.svg';
import PosMeal from '../../../assets/blood-glucose/pos-refeicao.svg';
import BeforeBedtime from '../../../assets/blood-glucose/antes-de-dormir.svg';
import General from '../../../assets/blood-glucose/geral.svg';

import { useGame } from '../../../hooks/game';

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
  ModalCreateRegisterButton,
  StateContainer,
  StateOptionContainer,
  StateOptionButton,
  StateOptionText,
} from './styles';

interface IAddAlarmModalProps {
  selectedDate: Date;
  modalVisible: boolean;
  onModalVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAlarmModal: React.FC<IAddAlarmModalProps> = ({
  selectedDate,
  modalVisible,
  onModalVisibleChange,
}) => {
  const notification = useSelector((state: IStoreState) => state.notification);
  const { insulinLogic } = useGame();

  const dispatch = useDispatch();

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
  const [selfState, setSelfState] = useState('');
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    if (notification.hasNotificationInteraction) {
      setCategory(notification.category);
    }
  }, [notification]);

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

    dispatch(interactionSuccess());
  }, [onModalVisibleChange, selectedDate, dispatch]);

  const handleAddRegistry = useCallback(async () => {
    await insulinLogic(selectedDate);

    await api.post('/registries', {
      date: selectedDate,
      category,
      selfState,
      message,
      day: selectedDate.getDate(),
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });

    handleLeaveModal();
  }, [
    selectedDate,
    category,
    selfState,
    message,
    handleLeaveModal,
    insulinLogic,
  ]);

  const handleCategoryChange = useCallback(() => {
    setMessage('');
    setSelfState('');
  }, [category]);

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
              onPress={() => {
                setCategory(oldCategory =>
                  oldCategory === 'physical-activity'
                    ? ''
                    : 'physical-activity',
                );

                return handleCategoryChange();
              }}
            >
              <ModalCategoryButtonText
                selected={category === 'physical-activity'}
              >
                Atividade física
              </ModalCategoryButtonText>
            </ModalCategoryButton>

            <ModalCategoryButton
              selected={category === 'blood-glucose'}
              onPress={() => {
                setCategory(oldCategory =>
                  oldCategory === 'blood-glucose' ? '' : 'blood-glucose',
                );

                return handleCategoryChange();
              }}
            >
              <ModalCategoryButtonText selected={category === 'blood-glucose'}>
                Glicemia
              </ModalCategoryButtonText>
            </ModalCategoryButton>

            <ModalCategoryButton
              selected={category === 'insulin-therapy'}
              onPress={() => {
                setCategory(oldCategory =>
                  oldCategory === 'insulin-therapy' ? '' : 'insulin-therapy',
                );

                return handleCategoryChange();
              }}
            >
              <ModalCategoryButtonText
                selected={category === 'insulin-therapy'}
              >
                Insulina
              </ModalCategoryButtonText>
            </ModalCategoryButton>
          </ModalCategoryContainer>

          {category === 'physical-activity' && (
            <FadeInView>
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
            </FadeInView>
          )}

          {category === 'blood-glucose' && (
            <FadeInView>
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
                  keyboardType="numeric"
                  placeholderTextColor="#89828E"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  defaultValue={message}
                  onChangeText={value => {
                    setMessage(value);
                  }}
                />
              </TextInputContainer>

              <ModalTitleContainer>
                <ModalTitle>Selecione seu estado</ModalTitle>
              </ModalTitleContainer>

              <StateContainer>
                <StateOptionContainer>
                  <StateOptionButton
                    activeOpacity={0.8}
                    selfState={selfState === 'jejum'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'jejum' ? '' : 'jejum',
                      )
                    }
                  >
                    <Fasting width={30} height={30} />
                  </StateOptionButton>

                  <StateOptionText>Jejum</StateOptionText>
                </StateOptionContainer>

                <StateOptionContainer>
                  <StateOptionButton
                    activeOpacity={0.8}
                    selfState={selfState === 'pré-refeição'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'pré-refeição' ? '' : 'pré-refeição',
                      )
                    }
                  >
                    <PreMeal width={30} height={30} />
                  </StateOptionButton>

                  <StateOptionText>Pré-refeição</StateOptionText>
                </StateOptionContainer>

                <StateOptionContainer>
                  <StateOptionButton
                    activeOpacity={0.8}
                    selfState={selfState === 'pós-refeição'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'pós-refeição' ? '' : 'pós-refeição',
                      )
                    }
                  >
                    <PosMeal width={30} height={30} />
                  </StateOptionButton>

                  <StateOptionText>Pós-refeição</StateOptionText>
                </StateOptionContainer>

                <StateOptionContainer>
                  <StateOptionButton
                    activeOpacity={0.8}
                    selfState={selfState === 'antes de dormir'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'antes de dormir' ? '' : 'antes de dormir',
                      )
                    }
                  >
                    <BeforeBedtime width={30} height={30} />
                  </StateOptionButton>

                  <StateOptionText>Antes de dormir</StateOptionText>
                </StateOptionContainer>

                <StateOptionContainer>
                  <StateOptionButton
                    activeOpacity={0.8}
                    selfState={selfState === 'geral'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'geral' ? '' : 'geral',
                      )
                    }
                  >
                    <General width={30} height={30} />
                  </StateOptionButton>

                  <StateOptionText>Geral</StateOptionText>
                </StateOptionContainer>
              </StateContainer>
            </FadeInView>
          )}

          {category === 'insulin-therapy' && (
            <FadeInView>
              <ModalTitleContainer>
                <ModalTitle>Unidade(s)</ModalTitle>
              </ModalTitleContainer>

              <TextInputContainer isFocused={isFocused}>
                <TextInputIconContainer>
                  <Icon
                    name="eyedropper-variant"
                    size={20}
                    color={isFocused || isFilled ? '#146ba8' : '#89828E'}
                  />
                </TextInputIconContainer>

                <TextInput
                  keyboardAppearance="dark"
                  keyboardType="numeric"
                  placeholderTextColor="#89828E"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  defaultValue={message}
                  onChangeText={value => {
                    setMessage(value);
                  }}
                />
              </TextInputContainer>
            </FadeInView>
          )}
        </ModalContainer>
      </TouchableWithoutFeedback>

      <ModalCreateRegisterButton onPress={handleAddRegistry}>
        Criar registro
      </ModalCreateRegisterButton>
    </Modal>
  );
};

export default AddAlarmModal;
