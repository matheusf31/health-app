import styled, { css } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button';

interface IModalRepetitionButton {
  selected: boolean;
}

interface IModalRepetitionButtonText {
  selected: boolean;
}

interface IModalCategoryButton {
  selected: boolean;
}

interface IModalCategoryButtonText {
  selected: boolean;
}

interface ITextInputContainerProps {
  isFocused: boolean;
}

export const ModalContainer = styled.View`
  width: 100%;
  background: #fbfbfb;
  border-radius: 10px;

  padding: 20px 24px;
`;

export const ModalTitleContainer = styled.View``;

export const ModalTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 24px;
`;

export const ModalRepetitionColumn = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const ModalRepetitionContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  margin: 10px;
`;

export const ModalRadioContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  flex-direction: row;
  align-items: center;
  margin: 5px;
  padding: 10px;
`;

export const ModalRepetitionButton = styled.View<IModalRepetitionButton>`
  border-radius: 10px;
  border-width: 1px;
  border-color: #146ba8;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  ${props =>
    props.selected &&
    css`
      background: #146ba8;
    `}
`;

export const ModalRepetitionButtonText = styled.Text<
  IModalRepetitionButtonText
>`
  color: #17181d;
  font-family: 'Roboto-Regular';
  font-size: 16px;

  ${props =>
    props.selected &&
    css`
      color: #000;
    `}
`;

export const ModalCategoryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const ModalCategoryButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<IModalCategoryButton>`
  border-radius: 10px;
  border-width: 1px;
  border-color: #146ba8;
  padding: 8px;

  ${props =>
    props.selected &&
    css`
      background: #146ba8;
    `}
`;

export const ModalCategoryButtonText = styled.Text<IModalCategoryButtonText>`
  color: #17181d;
  font-family: 'Roboto-Regular';
  font-size: 14px;

  ${props =>
    props.selected &&
    css`
      color: #fff;
    `}
`;

/* Input */
export const TextInputContainer = styled.View<ITextInputContainerProps>`
  width: 100%;
  height: 55px;
  padding: 0 16px;
  margin-top: 10px;
  margin-bottom: 10px;

  background: #f4f4f4;

  border-radius: 10px;
  border-width: 2px;
  border-color: #f4f4f4;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #146ba8;
    `}
`;

export const TextInputIconContainer = styled.View`
  width: 30px;
`;

export const Icon = styled(MaterialCommunityIcons)``;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #17181d;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const ModalCreateAlarmButton = styled(Button)``;
