import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { parseISO } from 'date-fns';

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
import { useAuth } from '../../../hooks/auth';

import {
  ModalContainer,
  ModalTitle,
  ModalTitleContainer,
  ModalCategoryContainer,
  ModalCategoryView,
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
  QuestionContainer,
  QuestionText,
  InputContainer,
  QuestionInput,
  UnitText,
} from './styles';

interface IAddAlarmModalProps {
  selectedDate: string;
  modalVisible: boolean;
  onSelectedDateChange: React.Dispatch<React.SetStateAction<string>>;
  onModalVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAlarmModal: React.FC<IAddAlarmModalProps> = ({
  selectedDate,
  modalVisible,
  onModalVisibleChange,
  onSelectedDateChange,
}) => {
  const notification = useSelector((state: IStoreState) => state.notification);
  const {
    insulinLogic,
    medicineLogic,
    imcLogic,
    physicalActivityLogic,
    handleCheckGameSequences,
  } = useGame();
  const { user } = useAuth();

  const dispatch = useDispatch();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [selfState, setSelfState] = useState('');
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [weight, setWeight] = useState(user.weight); // peso
  const [height, setHeight] = useState(user.height); // altura

  useEffect(() => {
    if (notification.hasNotificationInteraction) {
      setCategory(notification.category);
    }
  }, [notification]);

  const handleLeaveModal = useCallback(() => {
    onModalVisibleChange(false);
    setCategory('');
    setMessage('');

    dispatch(interactionSuccess());
  }, [onModalVisibleChange, dispatch]);

  const handleAddRegistry = useCallback(
    async (customMessage?: string) => {
      const userToUpdate = { ...user };

      if (category === 'insulin-therapy' && user.goals['aplicar insulina']) {
        await insulinLogic(selectedDate);
      }

      if (
        category === 'medicine' &&
        user.goals['tomar os medicamentos seguindo os alarmes']
      ) {
        await medicineLogic(selectedDate);
      }

      if (category === 'physical-activity') {
        await physicalActivityLogic(selectedDate);
      }

      await api.post('/registries', {
        user_id: userToUpdate.id,
        date: selectedDate,
        category,
        selfState,
        message: customMessage || message,
        day: parseISO(selectedDate).getDate(),
        month: parseISO(selectedDate).getMonth(),
        year: parseISO(selectedDate).getFullYear(),
      });

      if (category !== 'weight') {
        await handleCheckGameSequences({
          userToUpdate,
          selectedDate,
          category,
        });
      }

      handleLeaveModal();
    },
    [
      user,
      selectedDate,
      category,
      selfState,
      message,
      handleLeaveModal,
      insulinLogic,
      medicineLogic,
      physicalActivityLogic,
      handleCheckGameSequences,
    ],
  );

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

  const imc = useMemo(() => parseFloat((weight / height ** 2).toFixed(2)), [
    weight,
    height,
  ]);

  const handleUpdateUserImc = useCallback(async () => {
    const updatedUser = {
      ...user,
      weight,
      height,
      imc,
    };

    await imcLogic(updatedUser);

    await handleAddRegistry(
      `seu peso atual é ${weight}kg e sua altura é ${height}m`,
    );
  }, [imc, imcLogic, handleAddRegistry, user]);

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
            containerStyle={{ marginTop: -10, marginBottom: 10 }}
          />

          <ModalTitleContainer>
            <ModalTitle>Selecione a categoria</ModalTitle>
          </ModalTitleContainer>

          <ModalCategoryContainer>
            <ModalCategoryView>
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
                <ModalCategoryButtonText
                  selected={category === 'blood-glucose'}
                >
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
            </ModalCategoryView>

            <ModalCategoryView>
              <ModalCategoryButton
                selected={category === 'medicine'}
                onPress={() =>
                  setCategory(prevState =>
                    prevState === 'medicine' ? '' : 'medicine',
                  )
                }
              >
                <ModalCategoryButtonText selected={category === 'medicine'}>
                  Medicamento
                </ModalCategoryButtonText>
              </ModalCategoryButton>

              <ModalCategoryButton
                selected={category === 'weight'}
                onPress={() =>
                  setCategory(prevState =>
                    prevState === 'weight' ? '' : 'weight',
                  )
                }
              >
                <ModalCategoryButtonText selected={category === 'weight'}>
                  Peso
                </ModalCategoryButtonText>
              </ModalCategoryButton>
            </ModalCategoryView>
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

          {category === 'medicine' && (
            <FadeInView>
              <ModalTitleContainer>
                <ModalTitle>Medicamento(s)</ModalTitle>
              </ModalTitleContainer>

              <TextInputContainer isFocused={isFocused}>
                <TextInputIconContainer>
                  <Icon
                    name="medical-bag"
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

          {category === 'weight' && (
            <FadeInView>
              <QuestionContainer>
                <QuestionText>Atualize seu peso</QuestionText>

                <InputContainer>
                  <QuestionInput
                    keyboardType="numeric"
                    placeholderTextColor="#89828E"
                    defaultValue={weight.toString()}
                    onChangeText={value => {
                      setWeight(Number(value));
                    }}
                  />

                  <UnitText>kg</UnitText>
                </InputContainer>
              </QuestionContainer>

              <QuestionContainer>
                <QuestionText>Atualize sua altura</QuestionText>

                <InputContainer>
                  <QuestionInput
                    keyboardType="numeric"
                    placeholderTextColor="#89828E"
                    defaultValue={height.toString()}
                    onChangeText={value => {
                      setHeight(Number(value));
                    }}
                  />

                  <UnitText>m</UnitText>
                </InputContainer>
              </QuestionContainer>
            </FadeInView>
          )}
        </ModalContainer>
      </TouchableWithoutFeedback>

      <ModalCreateRegisterButton
        onPress={() => {
          if (category === 'weight') {
            return handleUpdateUserImc();
          }

          return handleAddRegistry();
        }}
      >
        Criar registro
      </ModalCreateRegisterButton>
    </Modal>
  );
};

export default AddAlarmModal;
