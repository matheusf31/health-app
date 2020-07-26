import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';

import DateInput from '../../../components/DateInput';

import Fasting from '../../../assets/blood-glucose/jejum.svg';
import PreMeal from '../../../assets/blood-glucose/pre-refeicao.svg';
import PosMeal from '../../../assets/blood-glucose/pos-refeicao.svg';
import BeforeBedtime from '../../../assets/blood-glucose/antes-de-dormir.svg';
import General from '../../../assets/blood-glucose/geral.svg';

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

interface IFadeInViewProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const FadeInView: React.FC<IFadeInViewProps> = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

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
  const [selfState, setSelfState] = useState('');
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
                    selfState={selfState === 'fasting'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'fasting' ? '' : 'fasting',
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
                    selfState={selfState === 'pre-meal'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'pre-meal' ? '' : 'pre-meal',
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
                    selfState={selfState === 'pos-meal'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'pos-meal' ? '' : 'pos-meal',
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
                    selfState={selfState === 'before-bedtime'}
                    onPress={() =>
                      setSelfState(oldState =>
                        oldState === 'before-bedtime' ? '' : 'before-bedtime',
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
